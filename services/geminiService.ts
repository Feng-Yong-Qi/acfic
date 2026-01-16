import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateResponse = async (
  prompt: string, 
  history: string[] = []
): Promise<string> => {
  try {
    const systemInstruction = `
      你是一个专门服务于“工商联”（工商业联合会）会员企业的智能助手。
      你的名字叫“智联助手”。
      
      你的职责包括：
      1. 解答关于企业发展的政策问题（税收、补贴、人才引进）。
      2. 提供金融服务建议（贷款对接、融资渠道）。
      3. 法律咨询引导。
      4. 协助查询工商联活动和办事指南。
      
      回答风格：
      - 专业、亲切、简洁、高效。
      - 语气偏向商务官方，但不要过于生硬。
      - 如果用户询问具体数据，可以提示使用“智能问数”功能。
      
      上下文：
      用户正在使用“智联西城”小程序。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "抱歉，我现在无法回答这个问题，请稍后再试。";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "网络连接异常，请检查您的网络设置或联系管理员。";
  }
};