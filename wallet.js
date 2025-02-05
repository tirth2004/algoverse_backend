import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AgentKit } from "@coinbase/agentkit";
import { CdpWalletProvider } from "@coinbase/agentkit";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('coinbase_cloud_api_key.json', 'utf-8'));


async function initializeAgent() {
    const walletProvider = await CdpWalletProvider.configureWithWallet({
        mnemonicPhrase:"horse grace remain ordinary nose crash east disease number conduct hollow cliff",
        apiKeyName: "organizations/9fb2a49b-7805-4685-b302-1352a7509804/apiKeys/731857fe-4c3e-46c4-9e64-3307790f39d9",
        apiKeyPrivateKey: "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEICbZngVa/EI0pxHnGw0CHZCwwjfC9RNv1Sx1yEZC3k6NoAoGCCqGSM49\nAwEHoUQDQgAEllDMd2XVluTGqby9tWie5alH8IKWK+IvMllp6rxD5t1C1+5EhsrM\nnxSywWxXGKXZU84L/j+4gjW3Su7MtqEjqA==\n-----END EC PRIVATE KEY-----\n"
    });

    const agentKit = await AgentKit.from({ walletProvider });
    const tools = await getLangChainTools(agentKit);

    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-pro",
        maxOutputTokens: 2048,
    });

    const agent = createReactAgent({
        llm,
        tools,
    });

    return agent;
}

initializeAgent().then(agent => {
    console.log("Agent initialized:", agent);
}).catch(error => {
    console.error("Error initializing agent:", error);
});
