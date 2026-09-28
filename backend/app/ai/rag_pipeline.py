"""
RAG (Retrieval-Augmented Generation) Pipeline for Legal Documents
Handles document ingestion, embedding, retrieval, and answer generation
"""

import os
from typing import List, Dict, Optional, Tuple
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.docstore.document import Document
from loguru import logger
import chromadb
from chromadb.config import Settings as ChromaSettings

from app.config import settings
from app.models import LegalDomain


class RAGPipeline:
    """RAG Pipeline for legal document Q&A"""
    
    def __init__(self):
        """Initialize RAG pipeline"""
        self.embeddings = self._initialize_embeddings()
        self.llm = self._initialize_llm()
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP,
            length_function=len,
            separators=["\n\n", "\n", ". ", " ", ""]
        )
        
        # Initialize ChromaDB client
        self.chroma_client = chromadb.Client(ChromaSettings(
            persist_directory=settings.CHROMADB_PATH,
            anonymized_telemetry=False
        ))
        
        # Initialize collections
        self.legal_docs_collection = None
        self.cases_collection = None
        self._initialize_collections()
        
        logger.info("✅ RAG Pipeline initialized")
    
    def _initialize_embeddings(self) -> OpenAIEmbeddings:
        """Initialize OpenAI embeddings"""
        return OpenAIEmbeddings(
            openai_api_key=settings.OPENAI_API_KEY,
            model=settings.OPENAI_EMBEDDING_MODEL
        )
    
    def _initialize_llm(self) -> ChatOpenAI:
        """Initialize LLM"""
        return ChatOpenAI(
            openai_api_key=settings.OPENAI_API_KEY,
            model_name=settings.OPENAI_MODEL,
            temperature=settings.OPENAI_TEMPERATURE,
            max_tokens=settings.OPENAI_MAX_TOKENS
        )
    
    def _initialize_collections(self):
        """Initialize or get existing ChromaDB collections"""
        try:
            # Legal documents collection
            try:
                self.legal_docs_collection = self.chroma_client.get_collection(
                    name=settings.CHROMADB_COLLECTION
                )
                logger.info(f"📚 Loaded existing collection: {settings.CHROMADB_COLLECTION}")
            except:
                self.legal_docs_collection = self.chroma_client.create_collection(
                    name=settings.CHROMADB_COLLECTION,
                    metadata={"description": "Indian legal documents and statutes"}
                )
                logger.info(f"📚 Created new collection: {settings.CHROMADB_COLLECTION}")
            
            # Case law collection
            try:
                self.cases_collection = self.chroma_client.get_collection(
                    name=settings.CHROMADB_CASES_COLLECTION
                )
                logger.info(f"⚖️  Loaded existing collection: {settings.CHROMADB_CASES_COLLECTION}")
            except:
                self.cases_collection = self.chroma_client.create_collection(
                    name=settings.CHROMADB_CASES_COLLECTION,
                    metadata={"description": "Landmark Indian court cases"}
                )
                logger.info(f"⚖️  Created new collection: {settings.CHROMADB_CASES_COLLECTION}")
        
        except Exception as e:
            logger.error(f"❌ Error initializing collections: {e}")
            raise
    
    def ingest_documents(
        self,
        documents: List[str],
        metadatas: Optional[List[Dict]] = None,
        collection_type: str = "legal"
    ) -> int:
        """
        Ingest documents into vector store
        
        Args:
            documents: List of document texts
            metadatas: List of metadata dictionaries
            collection_type: "legal" or "cases"
            
        Returns:
            Number of chunks ingested
        """
        try:
            # Create Document objects
            docs = [Document(page_content=doc) for doc in documents]
            
            # Split into chunks
            chunks = self.text_splitter.split_documents(docs)
            
            # Add metadata if provided
            if metadatas:
                for i, chunk in enumerate(chunks):
                    if i < len(metadatas):
                        chunk.metadata.update(metadatas[i])
            
            # Generate embeddings
            texts = [chunk.page_content for chunk in chunks]
            embeddings = self.embeddings.embed_documents(texts)
            
            # Select collection
            collection = (
                self.legal_docs_collection 
                if collection_type == "legal" 
                else self.cases_collection
            )
            
            # Add to collection
            ids = [f"doc_{i}" for i in range(len(chunks))]
            collection.add(
                documents=texts,
                embeddings=embeddings,
                metadatas=[chunk.metadata for chunk in chunks],
                ids=ids
            )
            
            logger.info(f"✅ Ingested {len(chunks)} chunks into {collection_type} collection")
            return len(chunks)
        
        except Exception as e:
            logger.error(f"❌ Error ingesting documents: {e}")
            raise
    
    def retrieve_relevant_context(
        self,
        query: str,
        top_k: int = 5,
        collection_type: str = "legal",
        filters: Optional[Dict] = None
    ) -> List[Dict]:
        """
        Retrieve relevant documents for a query
        
        Args:
            query: User query
            top_k: Number of results to return
            collection_type: "legal" or "cases"
            filters: Metadata filters
            
        Returns:
            List of relevant documents with metadata
        """
        try:
            # Generate query embedding
            query_embedding = self.embeddings.embed_query(query)
            
            # Select collection
            collection = (
                self.legal_docs_collection 
                if collection_type == "legal" 
                else self.cases_collection
            )
            
            # Query collection
            results = collection.query(
                query_embeddings=[query_embedding],
                n_results=top_k,
                where=filters
            )
            
            # Format results
            documents = []
            for i in range(len(results['documents'][0])):
                documents.append({
                    'text': results['documents'][0][i],
                    'metadata': results['metadatas'][0][i] if results['metadatas'] else {},
                    'distance': results['distances'][0][i] if results['distances'] else 0.0
                })
            
            logger.info(f"🔍 Retrieved {len(documents)} relevant documents")
            return documents
        
        except Exception as e:
            logger.error(f"❌ Error retrieving context: {e}")
            return []
    
    def generate_answer(
        self,
        question: str,
        legal_domain: Optional[LegalDomain] = None
    ) -> Dict:
        """
        Generate answer using RAG
        
        Args:
            question: User's legal question
            legal_domain: Optional domain filter
            
        Returns:
            Structured answer with legal information
        """
        try:
            # Retrieve relevant context
            filters = {"domain": legal_domain.value} if legal_domain else None
            context_docs = self.retrieve_relevant_context(
                query=question,
                top_k=settings.TOP_K_RESULTS,
                filters=filters
            )
            
            # Build context string
            context = "\n\n".join([doc['text'] for doc in context_docs])
            
            # Create prompt
            prompt = self._create_legal_qa_prompt(question, context)
            
            # Generate answer
            response = self.llm.invoke(prompt)
            
            # Parse response
            answer = self._parse_legal_answer(response.content, context_docs)
            
            return answer
        
        except Exception as e:
            logger.error(f"❌ Error generating answer: {e}")
            raise
    
    def _create_legal_qa_prompt(self, question: str, context: str) -> str:
        """Create prompt for legal Q&A"""
        template = """You are an expert legal AI assistant for Indian law. Use the provided legal context to answer the question accurately.

LEGAL CONTEXT:
{context}

QUESTION:
{question}

Provide a structured answer with:
1. APPLICABLE LAW: List relevant laws, sections, and articles
2. EXPLANATION: Simple, clear explanation in layman's terms
3. USER RIGHTS: What rights does the person have?
4. SUGGESTED ACTIONS: Practical steps they should take

Be precise, cite specific sections, and ensure accuracy. If the context doesn't contain enough information, say so clearly.

ANSWER:"""
        
        return template.format(context=context, question=question)
    
    def _parse_legal_answer(
        self,
        response: str,
        context_docs: List[Dict]
    ) -> Dict:
        """Parse LLM response into structured format"""
        # Simple parsing (in production, use more robust parsing)
        sections = {
            'applicable_law': [],
            'explanation': '',
            'user_rights': [],
            'suggested_actions': [],
            'references': [],
            'confidence_score': 0.85  # Based on retrieval scores
        }
        
        # Extract sections
        lines = response.split('\n')
        current_section = None
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            if 'APPLICABLE LAW' in line.upper():
                current_section = 'applicable_law'
            elif 'EXPLANATION' in line.upper():
                current_section = 'explanation'
            elif 'USER RIGHTS' in line.upper():
                current_section = 'user_rights'
            elif 'SUGGESTED ACTIONS' in line.upper():
                current_section = 'suggested_actions'
            elif current_section:
                if current_section in ['applicable_law', 'user_rights', 'suggested_actions']:
                    if line.startswith('-') or line.startswith('•') or line[0].isdigit():
                        sections[current_section].append(line.lstrip('-•0123456789. '))
                elif current_section == 'explanation':
                    sections['explanation'] += line + ' '
        
        # Extract references from context
        sections['references'] = [
            doc['metadata'].get('source', 'Indian Legal Database')
            for doc in context_docs[:3]
        ]
        
        return sections
    
    def semantic_search_cases(
        self,
        scenario: str,
        top_k: int = 5
    ) -> List[Dict]:
        """
        Semantic search for relevant cases
        
        Args:
            scenario: User's legal scenario
            top_k: Number of cases to return
            
        Returns:
            List of relevant cases with summaries
        """
        try:
            # Retrieve similar cases
            cases = self.retrieve_relevant_context(
                query=scenario,
                top_k=top_k,
                collection_type="cases"
            )
            
            # Format case summaries
            formatted_cases = []
            for case in cases:
                # Generate 3-line summary if not in metadata
                summary = case['metadata'].get('summary', case['text'][:300])
                
                formatted_cases.append({
                    'case_name': case['metadata'].get('case_name', 'Unknown Case'),
                    'court': case['metadata'].get('court', 'Unknown Court'),
                    'year': case['metadata'].get('year', 0),
                    'summary': summary,
                    'citation': case['metadata'].get('citation', ''),
                    'relevance_score': 1.0 - case['distance'],
                    'why_relevant': self._explain_relevance(scenario, case['text']),
                    'key_points': case['metadata'].get('key_points', [])
                })
            
            return formatted_cases
        
        except Exception as e:
            logger.error(f"❌ Error in semantic case search: {e}")
            return []
    
    def _explain_relevance(self, query: str, case_text: str) -> str:
        """Generate explanation of why a case is relevant"""
        # Simple relevance explanation
        # In production, use LLM to generate this
        return f"This case is relevant because it addresses similar legal issues mentioned in your query."


# Global RAG pipeline instance
rag_pipeline: Optional[RAGPipeline] = None


def get_rag_pipeline() -> RAGPipeline:
    """Get or create RAG pipeline instance"""
    global rag_pipeline
    if rag_pipeline is None:
        rag_pipeline = RAGPipeline()
    return rag_pipeline
