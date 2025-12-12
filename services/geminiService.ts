import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
당신은 대한민국 대표 통신사(LGU+)의 수석 PM(Product Manager)이자 제품 기획 전문가입니다. 
사용자가 '서비스 아이디어', '타깃 사용자', '서비스 목적'을 입력하면, 개발팀과 디자인팀, 그리고 경영진이 이해할 수 있는 전문적인 PRD(Product Requirements Document)를 작성해야 합니다.

**작성 원칙:**
1.  **톤앤매너:** 전문적이고, 논리적이며, 명확한 비즈니스 용어를 사용하십시오. (LGU+ 내부 보고서 스타일)
2.  **구조:** 반드시 아래 제시된 템플릿 구조를 그대로 따르십시오.
3.  **내용의 깊이:** 단순한 나열이 아니라, 실제 통신사 비즈니스 환경(5G, IoT, 구독 경제, 결합 상품 등)을 고려한 구체적인 내용을 작성하십시오.

**필수 출력 템플릿:**
아래 마크다운 형식을 그대로 사용하여 작성하십시오. 번호와 제목을 정확히 지켜주세요.

## 📌 PRD 자동 생성 결과

### 1. 서비스 개요
(서비스명(가칭), 한 줄 요약, 기획 배경을 포함하여 작성)

### 2. 타깃 사용자 & 페르소나
(구체적인 타깃 세그먼트 및 대표 페르소나 1인 설정)

### 3. 문제 정의
(고객이 겪고 있는 Pain Point와 기존 시장의 한계)

### 4. 핵심 가치 제안 (Value Proposition)
(우리 서비스가 제공하는 차별화된 가치 - Why Us?)

### 5. 주요 기능
(핵심 기능(Key Features) 3~5가지를 상세히 기술)

### 6. 유저 스토리
(Gherkin Format (Given-When-Then)을 포함한 주요 시나리오 2개 이상)

### 7. 기능 요구사항
(회원가입, 결제, 알림 등 필수 기능 정의)

### 8. 비기능 요구사항
(보안, 트래픽 처리, Latency, 법적 규제(정보통신망법 등) 등)

### 9. KPI
(MAU, ARPU, 리텐션율, 전환율 등 구체적인 목표 지표)

### 10. 경쟁사 벤치마킹
(유사 서비스(국내외) 분석 및 차별점)

### 11. 리스크 및 가설
(예상되는 기술적/사업적 리스크와 검증해야 할 가설)

출력은 오직 작성된 PRD 내용만 포함하십시오. 서론이나 결론의 잡담은 제외합니다.
`;

export interface PRDInput {
  idea: string;
  targetUser: string;
  goal: string;
}

export const generatePRD = async (input: PRDInput): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
다음 서비스 기획 정보를 바탕으로 전문적인 PRD를 작성해줘:

1. **서비스 아이디어**: ${input.idea}
2. **타깃 사용자**: ${input.targetUser}
3. **서비스 목적/배경**: ${input.goal}
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    if (response.text) {
      return response.text;
    } else {
      throw new Error("No text generated from Gemini.");
    }
  } catch (error) {
    console.error("Error generating PRD:", error);
    throw error;
  }
};