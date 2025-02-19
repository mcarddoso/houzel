// "use client"

// import { useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   ArrowUp,
//   ChevronDown,
//   Globe,
//   Plus,
//   ReceiptText,
//   Settings,
//   User,
//   X,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Textarea } from "@/components/ui/textarea";

// const previewVariants = {
//   initial: { height: "4rem", opacity: 1, filter: "blur(0px)" },
//   animate: { height: "4rem", opacity: 1, filter: "blur(0px)" },
//   exit: { height: 0, opacity: 0, filter: "blur(8px)" },
// };

// export default function Home() {
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [expandedImage, setExpandedImage] = useState<string | null>(null);
//   const [prompt, setPrompt] = useState<string | null>(null);
//   const [aiDetection, setAiDetection] = useState<boolean | null>(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   function openDeviceFiles() {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//       fileInputRef.current.click();
//     }
//   }

//   function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       const urls = files.map((file) => URL.createObjectURL(file));
//       setImagePreviews((prev) => [...prev, ...urls]);
//     }
//   }

//   function removeImage(indexToRemove: number) {
//     setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
//   }

//   return (
//     <main className="w-full h-full flex flex-col items-center bg-black relative">
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         ref={fileInputRef}
//         onChange={onFilesSelected}
//         className="hidden"
//       />

//       {expandedImage && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black"
//         >
//           <div className="relative w-full h-full flex items-center justify-center">
//             <img
//               src={expandedImage}
//               alt="Expanded preview"
//               className="object-contain max-w-full max-h-full"
//             />
//             <button
//               type="button"
//               onClick={() => setExpandedImage(null)}
//               className="absolute top-4 left-4 rounded-full p-2"
//             >
//               Voltar
//             </button>
//           </div>
//         </motion.div>
//       )}

//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 p-4 flex items-center space-x-2">
//         <DropdownMenu>
//           <DropdownMenuTrigger className="flex items-center space-x-2">
//             <p className="font-semibold text-md tracking-tight">
//               Houzel <span className="font-medium">AI</span>
//             </p>
//             <ChevronDown size={16} className="text-muted-foreground" />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="rounded-xl w-48 border-0 bg-neutral-800/80 backdrop-blur-lg">
//             <DropdownMenuItem className="text-md px-3 py-1">
//               Meu perfil
//               <User className="ms-auto" />
//             </DropdownMenuItem>
//             <DropdownMenuSeparator className="bg-neutral-700" />
//             <DropdownMenuItem className="text-md px-3 py-1">
//               Configurações
//               <Settings className="ms-auto" />
//             </DropdownMenuItem>
//             <DropdownMenuSeparator className="bg-neutral-700" />
//             <DropdownMenuItem className="text-md px-3 py-1">
//               Pagamentos
//               <ReceiptText className="ms-auto" />
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       <div className="fixed bottom-0 start-0 w-full">
//         <div className="p-4 flex space-x-3">
//           <div className="bg-neutral-900 rounded-2xl p-4 w-fit" onClick={() => setPrompt("Avalie minha redação de acordo com as competências e normas do Enem")}>
//             <p className="font-medium">INEP - Enem</p>
//             <p className="text-muted-foreground">Avaliar redação</p>
//           </div>
//           <div className="bg-neutral-900 rounded-2xl p-4 w-fit" onClick={() => setPrompt("Crie quizes a partir do enem")}>
//             <p className="font-medium">Quiz</p>
//             <p className="text-muted-foreground">Quiz sobre enem</p>
//           </div>
//         </div>
//         <div className="p-5 bg-neutral-900 rounded-tl-3xl rounded-tr-3xl flex flex-col">
//           <div id="pic_preview" className="flex gap-2 flex-wrap">
//             <AnimatePresence>
//               {imagePreviews.map((url, index) => (
//                 <motion.div
//                   key={url}
//                   variants={previewVariants}
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   transition={{ duration: 0.5 }}
//                   className="w-16 rounded-xl relative bg-neutral-700 overflow-hidden cursor-pointer"
//                   onClick={() => setExpandedImage(url)}
//                 >
//                   <img
//                     src={url}
//                     alt={`preview-${index}`}
//                     className="object-cover w-full h-full"
//                   />
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeImage(index);
//                     }}
//                     className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 flex items-center justify-center"
//                   >
//                     <X className="text-black" size={14} />
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//           <Textarea
//             placeholder="Message Houzel"
//             className="border-0 shadow-none mb-2 focus-visible:ring-0 ps-0 min-h-fit max-h-[120px]"
//             value={prompt ?? ''}
//             onChange={(e) => setPrompt(e.target.value)}
//           />
//           <div className="flex w-full gap-3 relative">
//             <Button
//               size="sm"
//               variant="outline"
//               onClick={openDeviceFiles}
//               className="w-10 h-10 rounded-full bg-transparent border-neutral-800 outline-none ring-0 focus:ring-0"
//             >
//               <Plus />
//             </Button>
//             <Button
//               size="sm"
//               variant="outline"
//               onTouchStart={(e) => {
//                 e.currentTarget.classList.add('bg-blue-700', 'border-blue-700');
//               }}
//               onTouchEnd={(e) => {
//                 e.currentTarget.classList.remove('bg-blue-700', 'border-blue-700');
//               }}
//               className={`h-10 pe-4 outline-none text-sm rounded-full ${aiDetection ? 'bg-blue-700 border-blue-700 hover:bg-blue-700' : 'bg-transparent hover:bg-transparent border-neutral-800'}`}
//               onClick={() => setAiDetection((prev) => !prev)}
//             >
//               <Globe />
//               Verificador de IA
//             </Button>
//             <Button
//               size="sm"
//               disabled={!prompt}
//               className="w-10 h-10 outline-none text-sm rounded-full bg-white border-neutral-800 ms-auto"
//             >
//               <ArrowUp size={20} />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
// "use client"

// import { useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   ArrowUp,
//   ChevronDown,
//   Globe,
//   Plus,
//   ReceiptText,
//   Settings,
//   User,
//   X,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const previewVariants = {
//   initial: { height: "4rem", opacity: 1, filter: "blur(0px)" },
//   animate: { height: "4rem", opacity: 1, filter: "blur(0px)" },
//   exit: { height: 0, opacity: 0, filter: "blur(8px)" },
// };

// export default function Home() {
//   // Instead of only storing preview URLs, we now store both the file and its preview.
//   const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
//   const [expandedImage, setExpandedImage] = useState<string | null>(null);
//   const [prompt, setPrompt] = useState<string>("");
//   const [aiDetection, setAiDetection] = useState<boolean>(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   function openDeviceFiles() {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//       fileInputRef.current.click();
//     }
//   }

//   function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
//     if (e.target.files) {
//       const filesArr = Array.from(e.target.files);
//       const newFiles = filesArr.map((file) => ({
//         file,
//         preview: URL.createObjectURL(file),
//       }));
//       setFiles((prev) => [...prev, ...newFiles]);
//     }
//   }

//   function removeFile(indexToRemove: number) {
//     setFiles((prev) => {
//       const newFiles = [...prev];
//       const removed = newFiles.splice(indexToRemove, 1)[0];
//       // Revoke the object URL to avoid memory leaks.
//       URL.revokeObjectURL(removed.preview);
//       return newFiles;
//     });
//   }

//   async function handleEvaluate() {
//     const formData = new FormData();
//     files.forEach((item) => {
//       formData.append("images", item.file);
//     });
//     formData.append("ai_detection", aiDetection.toString());
//     formData.append("aux_prompt", prompt);
  
//     try {
//       const res = await fetch("/api/evaluate", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       console.log("Evaluation result:", data);
//     } catch (error) {
//       console.error("Error during evaluation", error);
//     }
//   }  

//   return (
//     <main className="w-full h-full flex flex-col items-center relative">
//       <div className="fixed top-0 left-1/2 -translate-x-1/2 p-4 flex items-center space-x-2">
//         <DropdownMenu>
//           <DropdownMenuTrigger className="flex items-center space-x-2">
//             <p className="font-semibold text-md tracking-tight">
//               Houzel <span className="font-medium text-muted-foreground">AI</span>
//             </p>
//             <ChevronDown size={16} className="text-muted-foreground" />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="rounded-xl w-48 border-0 bg-neutral-800/80 backdrop-blur-lg">
//             <DropdownMenuItem className="text-md px-3 py-1">
//               Meu perfil
//               <User className="ms-auto" />
//             </DropdownMenuItem>
//             <DropdownMenuSeparator className="bg-neutral-700" />
//             <DropdownMenuItem className="text-md px-3 py-1">
//               Configurações
//               <Settings className="ms-auto" />
//             </DropdownMenuItem>
//             <DropdownMenuSeparator className="bg-neutral-700" />
//             <DropdownMenuItem className="text-md px-3 py-1">
//               Pagamentos
//               <ReceiptText className="ms-auto" />
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
      
//       {/* Hidden file input */}
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         ref={fileInputRef}
//         onChange={onFilesSelected}
//         className="hidden"
//       />

//       {/* Fullscreen Expanded Image */}
//       {expandedImage && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black"
//         >
//           <div className="relative w-full h-full flex items-center justify-center">
//             <img
//               src={expandedImage}
//               alt="Expanded preview"
//               className="object-contain max-w-full max-h-full"
//             />
//             <button
//               type="button"
//               onClick={() => setExpandedImage(null)}
//               className="absolute top-4 left-4 rounded-full p-2 bg-white/80"
//             >
//               Voltar
//             </button>
//           </div>
//         </motion.div>
//       )}

//       {/* Content */}

//       <div className="h-full w-full pt-20 p-4 space-y-2">
//         {/* SENT */}
//         <div className="sent flex flex-col items-end space-y-2">
//           {/* SHOW FILES IF ANY */}
//           <div className="w-3 h-3 rounded-full bg-white"></div>
//           <div className="w-12 h-12 rounded-xl bg-neutral-800 text-primary-foreground flex items-center justify-center"></div>
//           <div className="bg-neutral-900 p-3 w-fit ms-auto rounded-xl max-w-[75%]">
//             <p className="text-sm">My prompt here</p>
//           </div>
//         </div>
//         {/* RECEIVED */}
//         <div className="p-3 w-fit me-auto rounded-xl max-w-[75%]">
//           <p className="text-sm">My prompt response here, remembering to format markdown alike</p>
//         </div>
//       </div>

//       <div className="fixed bottom-0 start-0 w-full">
//         <div className="p-4 flex space-x-3">
//           <div
//             className="bg-neutral-900 rounded-2xl p-4 w-fit"
//             onClick={() =>
//               setPrompt(
//                 "Avalie minha redação de acordo com as competências e normas do Enem"
//               )
//             }
//           >
//             <p className="font-medium">INEP - Enem</p>
//             <p className="text-muted-foreground">Avaliar redação</p>
//           </div>
//           <div
//             className="bg-neutral-900 rounded-2xl p-4 w-fit"
//             onClick={() => setPrompt("Crie quizes a partir do enem")}
//           >
//             <p className="font-medium">Quiz</p>
//             <p className="text-muted-foreground">Quiz sobre enem</p>
//           </div>
//         </div>
//         <div className="p-5 bg-neutral-900 rounded-tl-3xl rounded-tr-3xl flex flex-col">
//           <div id="pic_preview" className="flex gap-2 flex-wrap">
//             <AnimatePresence>
//               {files.map((item, index) => (
//                 <motion.div
//                   key={item.preview}
//                   variants={previewVariants}
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   transition={{ duration: 0.5 }}
//                   className="w-16 rounded-xl relative bg-neutral-700 overflow-hidden cursor-pointer"
//                   onClick={() => setExpandedImage(item.preview)}
//                 >
//                   <img
//                     src={item.preview}
//                     alt={`preview-${index}`}
//                     className="object-cover w-full h-full"
//                   />
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeFile(index);
//                     }}
//                     className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 flex items-center justify-center"
//                   >
//                     <X className="text-black" size={14} />
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//           <Textarea
//             placeholder="Additional instructions or context for evaluation..."
//             className="border-0 shadow-none mb-2 focus-visible:ring-0 ps-0 min-h-fit max-h-[120px]"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//           />
//           <div className="flex w-full gap-3 relative">
//             <Button
//               size="sm"
//               variant="outline"
//               onClick={openDeviceFiles}
//               className="w-10 h-10 rounded-full bg-transparent border-neutral-800 outline-none ring-0 focus:ring-0"
//             >
//               <Plus />
//             </Button>
//             <Button
//               size="sm"
//               variant="outline"
//               onTouchStart={(e) => {
//                 e.currentTarget.classList.add("bg-blue-700", "border-blue-700");
//               }}
//               onTouchEnd={(e) => {
//                 e.currentTarget.classList.remove("bg-blue-700", "border-blue-700");
//               }}
//               className={`h-10 pe-4 outline-none text-sm rounded-full ${
//                 aiDetection
//                   ? "bg-blue-700 border-blue-700 hover:bg-blue-700"
//                   : "bg-transparent hover:bg-transparent border-neutral-800"
//               }`}
//               onClick={() => setAiDetection((prev) => !prev)}
//             >
//               <Globe />
//               Verificador de IA
//             </Button>
//             <Button
//               size="sm"
//               disabled={!prompt}
//               onClick={handleEvaluate}
//               className="w-10 h-10 outline-none text-sm rounded-full bg-white border-neutral-800 ms-auto"
//             >
//               <ArrowUp size={20} />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client"

import { useRef, useState } from "react";
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

const previewVariants = {
  initial: { height: "4rem", opacity: 1, filter: "blur(0px)" },
  animate: { height: "4rem", opacity: 1, filter: "blur(0px)" },
  exit: { height: 0, opacity: 0, filter: "blur(8px)" },
};

export default function Home() {
  // Store files (with preview URLs) instead of just preview URLs.
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [aiDetection, setAiDetection] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  // New state: Only show chat content after the event is sent.
  const [showChat, setShowChat] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Trigger the chat content to display and show the loading spinner.
    setShowChat(true);
    setIsLoading(true);
    setEvaluationResult(null);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setEvaluationResult(data);
      setFiles([]); // Clear files after evaluation.
      setPrompt(""); // Clear prompt after evaluation.
    } catch (error) {
      setEvaluationResult({ error: "Evaluation failed", details: error });
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
          className="fixed inset-0 z-50 flex items-center justify-center"
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
              className="absolute top-4 left-4 rounded-full p-2 bg-white/80"
            >
              Voltar
            </button>
          </div>
        </motion.div>
      )}

      {/* Top Navigation */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 p-4 flex items-center space-x-2">
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

      {/* Chat Content (only shown if the event is sent) */}
      {showChat && (
        <div className="h-full w-full pt-20 pb-44 p-4 space-y-2 overflow-y-auto">
          {/* SENT message */}
          {prompt && (
            <div className="sent flex flex-col items-end space-y-2">
              <div className="flex flex-col gap-3 items-end">
                <div className="flex flex-end space-x-2">
                  {files.length > 0 &&
                    files.map((item, i) => (
                      <img
                        key={i}
                        src={item.preview}
                        alt={`thumb-${i}`}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    ))}
                </div>
                <p className="bg-neutral-900 p-3 rounded-xl max-w-[75%] text-sm">
                  {prompt}
                </p>
              </div>
              {isLoading && (
                <div className="w-3 h-3 rounded-full bg-white me-auto"></div>
              )}
            </div>
          )}

          {/* RECEIVED message */}
          {evaluationResult && (
            <div className="received p-3 w-fit me-auto rounded-xl max-w-[80%] leading-3 tracking-tight">
              <pre className="text-sm whitespace-pre-wrap">
                {`${evaluationResult.competency_evaluation}`}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Bottom Controls */}
      <div className="fixed bottom-0 start-0 w-full">
        {!showChat && (
          <div className="p-4 flex space-x-3">
            <div
              className="bg-neutral-900 rounded-2xl p-4 w-fit cursor-pointer"
              onClick={() =>
                setPrompt(
                  "Avalie minha redação de acordo com as competências e normas do Enem"
                )
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
                  className="w-16 rounded-xl relative bg-neutral-700 overflow-hidden cursor-pointer"
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
                    <X className="text-black" size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <Textarea
            placeholder="Additional instructions or context for evaluation..."
            className="border-0 shadow-none mb-2 focus-visible:ring-0 ps-0 min-h-fit max-h-[120px]"
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
              disabled={!prompt}
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
