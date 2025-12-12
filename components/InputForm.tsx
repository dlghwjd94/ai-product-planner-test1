import React, { useState } from 'react';

export interface InputData {
  idea: string;
  targetUser: string;
  goal: string;
}

interface InputFormProps {
  onSubmit: (data: InputData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<InputData>({
    idea: '',
    targetUser: '',
    goal: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.idea.trim() && formData.targetUser.trim() && formData.goal.trim()) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.idea.trim() !== '' && formData.targetUser.trim() !== '' && formData.goal.trim() !== '';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">서비스 기획 입력</h2>
        <p className="text-slate-500">
          AI가 상세한 PRD를 작성할 수 있도록 아래 항목들을 구체적으로 입력해주세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. 서비스 아이디어 */}
        <div className="space-y-2">
          <label htmlFor="idea" className="block text-lg font-bold text-slate-800">
            1. 서비스 아이디어
          </label>
          <p className="text-sm text-slate-500">만들고 싶은 서비스의 아이디어를 적어주세요.</p>
          <textarea
            id="idea"
            name="idea"
            className="w-full h-32 p-4 rounded-xl border border-slate-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none resize-none text-slate-700 placeholder-slate-400 transition-all text-base"
            placeholder="예시: 1인가구를 위한 AI 기반 홈 IoT 통합 관리 서비스..."
            value={formData.idea}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        {/* 2. 타깃 사용자 */}
        <div className="space-y-2">
          <label htmlFor="targetUser" className="block text-lg font-bold text-slate-800">
            2. 타깃 사용자
          </label>
          <p className="text-sm text-slate-500">주요 고객(예: MZ, 실버층, 유아가족 등)</p>
          <input
            type="text"
            id="targetUser"
            name="targetUser"
            className="w-full p-4 rounded-xl border border-slate-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none text-slate-700 placeholder-slate-400 transition-all text-base"
            placeholder="예: 자취를 막 시작한 2030 대학생 및 직장인"
            value={formData.targetUser}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        {/* 3. 서비스 목적 */}
        <div className="space-y-2">
          <label htmlFor="goal" className="block text-lg font-bold text-slate-800">
            3. 서비스 목적
          </label>
          <p className="text-sm text-slate-500">기획하려는 서비스의 목표/문제점/배경을 적어주세요.</p>
          <textarea
            id="goal"
            name="goal"
            className="w-full h-24 p-4 rounded-xl border border-slate-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none resize-none text-slate-700 placeholder-slate-400 transition-all text-base"
            placeholder="예: 기존 IoT 앱의 복잡한 UI 문제를 해결하고, 전력 낭비를 줄여 고객의 공과금 부담을 덜어주기 위함."
            value={formData.goal}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="mr-3 px-4 py-2 text-slate-500 font-medium hover:text-slate-700 transition-colors"
            onClick={() => setFormData({ idea: '', targetUser: '', goal: '' })}
            disabled={isLoading || (!formData.idea && !formData.targetUser && !formData.goal)}
          >
            초기화
          </button>
          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className={`
              px-6 py-3 rounded-xl font-bold text-white flex items-center space-x-2 transition-all duration-200
              ${isLoading || !isFormValid 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-pink-600 hover:bg-pink-700 shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-0.5'
              }
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>기획안 생성 중...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>PRD 생성하기</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;