"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUp,
  ChevronDown,
  Globe,
  Plus,
  ReceiptText,
  Settings,
  Sparkle,
  User,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { TextLoop } from "@/components/ui/text-loop";

const previewVariants = {
  initial: { height: "4rem", opacity: 1, filter: "blur(0px)" },
  animate: { height: "4rem", opacity: 1, filter: "blur(0px)" },
  exit: { height: 0, opacity: 0, filter: "blur(8px)" },
};

export default function Home() {
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [aiDetection, setAiDetection] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // New state for the chat history.
  const [chatHistory, setChatHistory] = useState<
    { type: "sent" | "received"; content: string; files?: { file: File; preview: string }[] }[]
  >([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load chat history from localStorage on component mount.
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  function openDeviceFiles() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  }

  function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      const newFiles = filesArr.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }

  function removeFile(indexToRemove: number) {
    setFiles((prev) => {
      const newFiles = [...prev];
      const removed = newFiles.splice(indexToRemove, 1)[0];
      // Revoke object URL to free memory.
      URL.revokeObjectURL(removed.preview);
      return newFiles;
    });
  }

  async function handleEvaluate() {
    // Prepare form data.
    const formData = new FormData();
    files.forEach((item) => {
      formData.append("images", item.file);
    });
    formData.append("ai_detection", aiDetection.toString());
    formData.append("aux_prompt", prompt);

    // Store the sent message in the chat history.
    setChatHistory((prev) => [
      ...prev,
      { type: "sent", content: prompt, files: files },
    ]);

    // Clear input and files for a clean slate.
    setPrompt("");
    setFiles([]);

    // Show loading state.
    setIsLoading(true);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      // Add the received message to the chat history.
      setChatHistory((prev) => [
        ...prev,
        { type: "received", content: `${data.competency_evaluation}\Nota final: ${data.final_score}` },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { type: "received", content: "Evaluation failed" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="w-full h-full flex flex-col items-center relative">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={onFilesSelected}
        className="hidden"
      />

      {/* Fullscreen Expanded Image */}
      {expandedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/80"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={expandedImage}
              alt="Expanded preview"
              className="object-contain max-w-full max-h-full"
            />
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 left-4 rounded-full p-2"
            >
              Voltar
            </button>
          </div>
        </motion.div>
      )}

      {/* Top Navigation */}
      <ProgressiveBlur
        className='pointer-events-none fixed top-0 left-0 w-full h-16'
        direction='top'
        blurIntensity={1}
      />
      <div className="fixed top-0 left-0 w-full p-4 flex items-center justify-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-2">
            <p className="font-semibold text-md tracking-tight">
              Houzel <span className="font-medium text-muted-foreground">AI</span>
            </p>
            <ChevronDown size={16} className="text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl w-48 border-0 bg-neutral-800/80 backdrop-blur-lg">
            <DropdownMenuItem className="text-md px-3 py-1">
              Meu perfil
              <User className="ms-auto" />
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neutral-700" />
            <DropdownMenuItem className="text-md px-3 py-1">
              Configurações
              <Settings className="ms-auto" />
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neutral-700" />
            <DropdownMenuItem className="text-md px-3 py-1">
              Pagamentos
              <ReceiptText className="ms-auto" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chat Content */}
      <div className="h-full w-full pt-20 pb-44 p-4 space-y-2 overflow-y-auto">
        {chatHistory.map((msg, index) => (
          <div key={index}>
            {msg.type === "sent" && (
              <div className="sent flex flex-col items-end space-y-2">
                <div className={`flex flex-col gap-3 items-end ${index !== 0 ? 'mt-12' : ''}`}>
                  <div className="flex flex-end space-x-2">
                    {msg.files &&
                      msg.files.map((item, i) => (
                        <img
                          key={i}
                          src={item.preview}
                          alt={`thumb-${i}`}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      ))}
                  </div>
                  {msg.content && (
                    <p className="bg-neutral-900 p-3 px-4 rounded-xl max-w-[75%] text-sm">
                      {msg.content}
                    </p>
                  )}
                </div>
                {isLoading && index === chatHistory.length - 1 && (
                  <TextLoop className='font-mono text-sm me-auto' interval={10}>
                    <TextShimmer className="font-mono text-sm me-auto" duration={1}>
                      Avaliando...
                    </TextShimmer>
                    <TextShimmer className="font-mono text-sm me-auto" duration={1}>
                      Processando...
                    </TextShimmer>
                    <TextShimmer className="font-mono text-sm me-auto" duration={1}>
                      Aguarde...
                    </TextShimmer>
                    <TextShimmer className="font-mono text-sm me-auto" duration={1}>
                      Estamos quase lá...
                    </TextShimmer>
                    <TextShimmer className="font-mono text-sm me-auto" duration={1}>
                      Quase pronto...
                    </TextShimmer>
                    <TextShimmer className="font-mono text-sm me-auto" duration={1}>
                      Quase lá...
                    </TextShimmer>
                  </TextLoop>
                )}
              </div>
            )}

            {msg.type === "received" && (
              <div className="received p-3 w-fit me-auto rounded-xl max-w-[90%] tracking-tight">
                <pre className="text-sm whitespace-pre-wrap">
                    {msg.content}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Controls */}
      <ProgressiveBlur
        className='pointer-events-none fixed bottom-[114px] left-0 w-full h-16 rounded-tl-2xl rounded-tr-2xl'
        direction='top'
        blurIntensity={6}
      />
      <div className="fixed bottom-0 start-0 w-full">
        {chatHistory.length === 0 && (
          <div className="p-4 flex space-x-3">
            <div
              className="bg-neutral-900 rounded-2xl p-4 w-fit cursor-pointer"
              onClick={() =>
                setPrompt("Avalie minha redação de acordo com as competências e normas do Enem")
              }
            >
              <p className="font-medium">INEP - Enem</p>
              <p className="text-muted-foreground">Avaliar redação</p>
            </div>
            <div
              className="bg-neutral-900 rounded-2xl p-4 w-fit cursor-pointer"
              onClick={() => setPrompt("Crie quizes a partir do enem")}
            >
              <p className="font-medium">Quiz</p>
              <p className="text-muted-foreground">Quiz sobre enem</p>
            </div>
          </div>
        )}
        <p className="text-muted-foreground text-xs text-center my-2 flex-center flex justify-center gap-1 leading-0">
          <Sparkle size={12}/>
          A Houzel pode cometer erros. Cheque as informações importantes.
        </p>
        <div className="p-5 bg-neutral-900 rounded-tl-3xl rounded-tr-3xl flex flex-col">
          <div id="pic_preview" className="flex gap-2 flex-wrap">
            <AnimatePresence>
              {files.map((item, index) => (
                <motion.div
                  key={item.preview}
                  variants={previewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="w-16 rounded-xl relative bg-neutral-700 overflow-hidden cursor-pointer mb-4"
                  onClick={() => setExpandedImage(item.preview)}
                >
                  <img
                    src={item.preview}
                    alt={`preview-${index}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 flex items-center justify-center"
                  >
                    <X className="text-black fill-black" size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <Textarea
            placeholder="Informações adicionais ou contexto para avaliação..."
            className="border-0 shadow-none mb-2 focus-visible:ring-0 ps-0 pt-0 min-h-fit max-h-[120px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex w-full gap-3 relative">
            <Button
              size="sm"
              variant="outline"
              onClick={openDeviceFiles}
              className="w-10 h-10 rounded-full bg-transparent border-neutral-800 outline-none ring-0 focus:ring-0"
            >
              <Plus />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onTouchStart={(e) => {
                e.currentTarget.classList.add("bg-blue-700", "border-blue-700");
              }}
              onTouchEnd={(e) => {
                e.currentTarget.classList.remove("bg-blue-700", "border-blue-700");
              }}
              className={`h-10 pe-4 outline-none text-sm rounded-full ${
                aiDetection
                  ? "bg-blue-700 border-blue-700 hover:bg-blue-700"
                  : "bg-transparent hover:bg-transparent border-neutral-800"
              }`}
              onClick={() => setAiDetection((prev) => !prev)}
            >
              <Globe />
              Verificador de IA
            </Button>
            <Button
              size="sm"
              disabled={isLoading || (!prompt && files.length === 0)}
              onClick={handleEvaluate}
              className="w-10 h-10 outline-none text-sm rounded-full bg-white border-neutral-800 ms-auto"
            >
              <ArrowUp size={20} />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
