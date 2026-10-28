"use client";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { Send } from "lucide-react";
import { useEffect } from "react";

const ChatFooter = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // event listener for enter key to submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-screen h-16 sticky bottom-0 bg-background border-t border-border flex items-center justify-center text-sm text-muted-foreground">
      <div className="flex w-full md:w-4xl justify-between">
        <input
          placeholder="Paste a link to your company or JD and let me tell you what Neel could do for you"
          className="w-full border-none focus:border-none focus:ring-0 focus:shadow-none focus:outline-none hover:cursor-none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          value={input}
          onChange={handleInputChange}
        />
        <Button
          variant="ghost"
          className="rounded-none hover:cursor-none hover:bg-zinc-900 hover:text-white transition-colors duration-100"
          onClick={handleSubmit}
          disabled={!input}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default ChatFooter;
