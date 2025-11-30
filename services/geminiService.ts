import { GoogleGenAI, Chat, LiveServerMessage } from "@google/genai";

// System instruction tailored for Wealth and Zhouyi
const SYSTEM_INSTRUCTION = `
你是一位精通《周易》（I Ching）、阴阳五行以及现代商业财富逻辑的大师。你的名字叫“易财先生”。
你的任务是与用户交流他们的想法、创意或商业计划，并从“易学”的角度进行剖析，重点在于【财富预言】和【商业运势】。

请遵循以下规则：
1. **起卦逻辑**：根据用户的问题或想法的“气场”（意图），在心中起一卦（无需告诉用户具体起卦过程，直接给出结果）。
2. **回复结构**：
   - **卦象揭示**：给出本卦的卦名（例如：火天大有）和卦象符号。
   - **五行生克**：分析当前局势的五行能量流转（例如：火生土，利于地产或稳健投资）。
   - **易理分析**：结合卦辞，解释用户想法的吉凶悔吝。
   - **财富预言（重点）**：针对用户的创意，给出具体的财富建议、投资时机、潜在风险以及获利方向。
3. **语言风格**：古韵与现代白话结合。既要有大师的高深莫测，又要有商业顾问的精准犀利。
4. **格式要求**：使用 Markdown 格式，适当使用加粗、列表，确保在手机端阅读舒适。
5. **限制**：如果用户问的问题完全无关（如写代码、闲聊无关话题），请礼貌地将话题引回到运势、决策和财富上来。

不要在此处通过工具调用，直接通过文本生成进行解答。
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.8, // Slightly higher for "divination" creativity
    },
  });

  return chatSession;
};

export const sendMessageStream = async (message: string) => {
  const chat = getChatSession();
  return chat.sendMessageStream({ message });
};
