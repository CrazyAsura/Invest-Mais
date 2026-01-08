import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class ChatService {
  private chat: ChatOpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.chat = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
    });
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const apiKey = this.configService.get<string>('OPENAI_API_KEY');
      // Mock de resposta se a chave não estiver configurada
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        return `Olá! Sou o assistente virtual do InvestMais. Recebi sua mensagem: "${message}". No momento estou em modo de demonstração.`;
      }

      const response = await this.chat.invoke([
        new SystemMessage(
          'Você é um assistente especializado em investimentos do Banco InvestMais. Seja cordial, profissional e focado em educação financeira.',
        ),
        new HumanMessage(message),
      ]);

      return response.content as string;
    } catch {
      return 'Desculpe, tive um problema ao processar sua mensagem. Tente novamente em instantes.';
    }
  }
}
