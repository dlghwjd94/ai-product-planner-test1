import React, { useState } from 'react';
import Layout from './components/Layout';
import InputForm, { InputData } from './components/InputForm';
import PRDResult from './components/PRDResult';
import { generatePRD } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [prdContent, setPrdContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: InputData) => {
    setLoading(true);
    setError(null);
    setPrdContent(''); // Clear previous content

    try {
      const result = await generatePRD(data);
      setPrdContent(result);
    } catch (err) {
      console.error(err);
      setError("PRD 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full">
        <InputForm onSubmit={handleGenerate} isLoading={loading} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        <PRDResult content={prdContent} isVisible={!!prdContent} />
        
        {!prdContent && !loading && !error && (
          <div className="text-center mt-12 opacity-50">
            <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </div>
            <p className="text-slate-500">
              아이디어를 입력하고 <span className="font-semibold text-slate-700">생성하기</span> 버튼을 눌러보세요.<br/>
              나머지는 AI가 알아서 작성해 드립니다.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;