'use client'

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Bell, Check, ChevronDown, Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Card from "@/components/ui/CardHover";
import Link from "next/link";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";
 
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import AnimatedListDemo from "@/components/magicui/animated-list-demo";
import AnimatedBeamMultipleOutputDemo from "@/components/magicui/animated-beam-multiple-outputs";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Nav from "@/components/nav";
import Navbar from "@/components/home/navbar";
import { redirect } from "next/navigation";

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];
 
const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top scale-75 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90"
      />
    ),
  },
];

export default function Home() {

  const user = useUser();

  if(!user.isSignedIn) {
    return (
      <main className="text-black [background:linear-gradient(180deg,#FFFFFF_0%,#EDEDED_100%)]">
        <Navbar />

        <div className="flex flex-col items-center px-0 py-6 max-md:pb-[140px]">
          <div className="flex flex-col items-center gap-8 px-0 py-[100px] z-10 max-w-[948px] max-md:gap-4 max-md:pt-[52px] max-md:max-h-[463px] max-h-[720px]">
            <div className="flex flex-col items-center max-md:gap-2 gap-4 self-stretch">
              <div className="text-black text-center max-md:max-w-[325px] max-md:text-[28px] text-[64px] font-medium leading-[140%] max-w-[743px] font-serif opacity-1 animate-text-fade-in">
                Deixa com a Houzel
              </div>
              <div className="w-[730px] max-md:max-w-[301px] max-md:text-[14px] text-[var(--text-tertiary)] text-center text-[20px] font-[300] leading-[30px] animate-text-fade-in opacity-1 delay-100 max-md:leading-[18px]">
                Prepare-se para o ENEM com Inteligência Artificial. Melhore suas notas com análises detalhadas, simulados personalizados e acompanhamento inteligente do seu progresso.
              </div>
              <Card />
              <div className="flex flex-col flex-1 animate-text-fade-in z-10 opacity-1 delay-800 pt-10 justify-end gap-3">
                <div className="flex items-start gap-5 max-md:flex-col">
                  <div className="flex min-w-[269px] h-14 py-4 px-6 justify-center items-center gap-1.5 rounded-[48px] bg-[var(--Button-primary-black)] cursor-pointer font-semibold group">
                    <div className="text-[var(--text-onblack)] text-[16px] font-[600] leading-[24px] group-hover:opacity-80 duration-150">
                      Testar Houzel
                    </div>
                  </div>
                  <div className="flex min-w-[269px] h-14 py-4 px-6 justify-center items-center gap-1.5 rounded-[48px] bg-[var(--Button-secondary-gray)] hover:opacity-80 duration-150 cursor-pointer font-semibold" aria-expanded="false" aria-haspopup="dialog"><div className="text-[var(--text-primary)] text-[16px] font-[600] leading-[24px]">Baixe o App</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-[22px] max-md:px-[8px] max-md:mt-[0px] relative flex justify-center mt-[250px]" id="use-cases">
          <div className="flex flex-col items-center px-0 rounded-[64px] w-full max-w-[1608px] max-md:bg-transparent max-md:py-[64px] max-md:gap-[30px] pt-40 max-md:pt-[80px] max-md:pb-[0px] pb-5 gap-[40px]">
            <div className="flex flex-col justify-center items-center max-md:gap-[16px] self-stretch flex-wrap !gap-[60px] mb-[60px]">
              <div className="flex justify-center items-center flex-col opacity-1 animate-text-fade-in">
                <div className="text-[var(--text-tertiary)] text-center text-lg font-[500] leading-[24px] mb-[20px] tracking-[0.36px]">Casos de uso</div>
                <div className="self-stretch text-black text-center text-5xl max-md:text-[24px] font-medium leading-[140%] font-serif">
                  Explore os casos de uso oficiais.
                </div>
                <div className="max-w-[672px] max-md:px-[12px] max-md:text-[14px] text-[var(--text-tertiary)] text-center text-[20px] font-[300] leading-[30px] mt-[20px]">
                  Aprenda como a Houzel lida com tarefas do mundo real através de replays passo a passo.
                </div>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 self-stretch max-md:px-[6px] max-md:justify-center overflow-x-auto px-4 py-0 opacity-1 animate-text-fade-in delay-100">
                <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid text-[color:#fff] bg-[#1A1A19] font-semibold"><span className="font-semibold opacity-1">Featured</span></div>
                <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">Research</span></div>
                <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">Life</span></div>
                <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">Data Analysis</span></div>
                <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">Education</span></div>
                <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">Productivity</span></div>
                <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">WTF</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row justify-start flex-wrap items-start gap-2 md:gap-6 md:px-5 xl:px-[80px] 2xl:px-[132px] max-md:px-[20px] relative">
          <BentoGrid>
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </div>

        <div id="caseCommunity" className="px-4 md:px-[22px] max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col justify-center items-center max-md:gap-[16px] self-stretch flex-wrap pt-40 max-md:pt-[80px]">
            <div className="opacity-1 animate-text-fade-in">
              <div className="self-stretch font-serif text-black text-center text-5xl max-md:text-[24px] font-medium whitespace-pre-wrap leading-[140%]">
                Descubra como a Houzel pode ajudar você.
              </div>
            </div>
          </div>
        </div>

        <div className="px-0 md:px-5 xl:px-[80px] 2xl:px-[132px]">
          <div className="h-9 min-w-[42px] min-h-9 p-1 justify-center items-center absolute bottom-[10px] left-1/2 !-translate-x-1/2 gap-[2px] cursor-pointer hover:opacity-80 hover:duration-150 hidden"></div>
          <div className="flex flex-col animate-home-view-show">
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mt-12 self-stretch max-md:px-[6px] max-md:justify-center overflow-x-auto px-4 py-0 opacity-1 animate-text-fade-in delay-100">
              <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid text-[color:#fff] bg-[#1A1A19] font-semibold"><span className="font-semibold opacity-1">Featured</span></div>
              <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">Research</span></div>
              <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">Life</span></div>
              <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">Data Analysis</span></div>
              <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">Education</span></div>
              <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">Productivity</span></div>
              <div className="flex justify-center items-center gap-1.5 self-stretch relative select-none cursor-pointer max-md:text-[13px] max-md:px-[12px] max-md:py-[8px] duration-150 text-[16px] font-[400] leading-5 tracking-[-0.024px] px-4 py-[9px] rounded-[100px] border-[rgba(0,0,0,0.12)] border border-solid hover:bg-[rgba(55,53,47,0.06)] text-[color:#858481]"><span className="font-semibold opacity-1">WTF</span></div>
            </div>
            <p className="text-[var(--text-disable)] text-center text-sm my-5 max-md:px-[20px]">All tasks and websites shown in the community are voluntarily shared by users. The platform does not display any content without user consent.</p>
            <div className="relative max-md:px-[20px]">
              <div className="flex flex-row flex-wrap md:gap-4 gap-2 sm:gap-6 [&>*]:w-[calc((100%-1.5rem)/4)] [&>*]:sm:w-[calc((100%-4.5rem)/4)] [&>*]:max-xl:sm:w-[calc((100%-3rem)/3)] [&>*]:max-xl:w-[calc((100%-1rem)/3)] [&>*]:max-lg:sm:w-[calc((100%-1.5rem)/2)] [&>*]:max-lg:w-[calc((100%-0.5rem)/2)] relative">
                <div className="rounded-[8px] overflow-hidden border border-[var(--border-main)] bg-[var(--fill-tsp-white-light)] cursor-pointer group/item-btns flex flex-col md:rounded-[18px]">
                  <div className="relative w-full p-4 md:p-6 overflow-hidden flex flex-col gap-3 flex-1 min-h-0 aspect-[4/3]">
                    <div className="flex-1 min-h-0 flex flex-col group-hover/item-btns:[filter:blur(5px)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 19 19" fill="none" color="var(--icon-tertiary)" className="flex-shrink-0"><g clipPath="url(#:r3h:_clip0)"><path fillRule="evenodd" clipRule="evenodd" d="M11.6716 5.85035L16.6453 0.918945H18.1053L15.94 4.99201C17.639 5.57349 18.8605 7.18428 18.8605 9.08035C18.8605 11.4663 16.9263 13.4005 14.5405 13.4005C12.1546 13.4005 10.2205 11.4663 10.2205 9.08035C10.2205 7.96714 10.6415 6.95226 11.333 6.1863H11.3328L11.3354 6.1837C11.4413 6.06657 11.5536 5.95527 11.6716 5.85035Z" fill="#B9B9B7" fillOpacity="0.7"></path><path fillRule="evenodd" clipRule="evenodd" d="M1.92502 5.85035L6.89873 0.918945H8.35875L6.19343 4.99201C7.8924 5.57349 9.11388 7.18428 9.11388 9.08035C9.11388 11.4663 7.17975 13.4005 4.79388 13.4005C2.40801 13.4005 0.473877 11.4663 0.473877 9.08035C0.473877 7.96714 0.894925 6.95226 1.58645 6.1863H1.58618L1.5888 6.1837C1.69472 6.06657 1.80698 5.95527 1.92502 5.85035Z" fill="#B9B9B7" fillOpacity="0.7"></path></g><defs><clipPath id=":r3h:_clip0"><rect width="19" height="19" fill="white"></rect></clipPath></defs></svg>
                      <div className="text-[var(--text-secondary)] text-sm md:text-base leading-[24px] font-serif break-words text-ellipsis line-clamp-[6] relative flex-1 min-h-0">
                        <p className="max-height: 121px; -webkit-line-clamp: 5;">
                          How are Electromagnetics Fields around human when near cell phone and when away from http://it.Show by chart
                        </p>
                        <p className="absolute inset-0 -z-[100] opacity-1">How are Electromagnetics Fields around human when near cell phone and when away from http://it.Show by chart</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-3 md:p-4 flex flex-col items-start gap-1 bg-[rgb(250,250,250)] dark:bg-[#383739]">
                    <h3 className="w-full text-[var(--theme-text-primary)] text-ellipsis break-words line-clamp-2 text-sm min-h-[44px]">
                      EM Fields Near/Far from Phone
                    </h3>
                    <div className="w-full flex items-center gap-1.5">
                      <div className="flex-1 text-[var(--text-tertiary)] text-xs md:text-[13px] leading-[18px] truncate">X.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:px-[20px] lg:px-[80px] xl:px-[137px] 2xl:px-[180px] max-md:px-[12px] max-md:pt-[40px] max-md:pb-[24px] px-[20px]">
          <div className="flex flex-col items-start gap-10 max-md:p-0 max-md:gap-0 pt-16 pb-[36px] md:px-[60px] lg:px-[50px] px-[20px] w-full max-w-[1440px]">
            <div className="flex flex-col lg:flex-row justify-between max-md:items-center items-start self-stretch gap-[16px]">
              <div className="flex flex-col gap-[4px] max-md:gap-[18px] max-md:w-full max-md:px-[20px]">
                <div className="flex items-center gap-2">
                  <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_32_23)"><mask id="path-1-outside-1_32_23" maskUnits="userSpaceOnUse" x="3" y="2" width="13" height="18" fill="black"><rect fill="white" x="3" y="2" width="13" height="18"/><path fillRule="evenodd" clipRule="evenodd" d="M11 10L14 7V5H5V7L8 10V11L5 14V17H14V14L11 11V10ZM4 3H15V4H4V3ZM4 18H15V19H4V18ZM6 15H7V16H6V15ZM8 15H9V16H8V15ZM7 14H8V15H7V14ZM9 14H10V15H9V14ZM11 14H12V15H11V14ZM10 13H11V14H10V13ZM8 13H9V14H8V13ZM9 12H10V13H9V12ZM9 10H10V11H9V10ZM10 8H11V9H10V8ZM9 7H10V8H9V7ZM7 7H8V8H7V7ZM11 7H12V8H11V7ZM8 8H9V9H8V8ZM10 15H11V16H10V15ZM12 15H13V16H12V15Z"/></mask><path fillRule="evenodd" clipRule="evenodd" d="M11 10L14 7V5H5V7L8 10V11L5 14V17H14V14L11 11V10ZM4 3H15V4H4V3ZM4 18H15V19H4V18ZM6 15H7V16H6V15ZM8 15H9V16H8V15ZM7 14H8V15H7V14ZM9 14H10V15H9V14ZM11 14H12V15H11V14ZM10 13H11V14H10V13ZM8 13H9V14H8V13ZM9 12H10V13H9V12ZM9 10H10V11H9V10ZM10 8H11V9H10V8ZM9 7H10V8H9V7ZM7 7H8V8H7V7ZM11 7H12V8H11V7ZM8 8H9V9H8V8ZM10 15H11V16H10V15ZM12 15H13V16H12V15Z" fill="white"/> <path d="M14 7L14.7071 7.70711L15 7.41421V7H14ZM14 5H15V4H14V5ZM5 5V4H4V5H5ZM5 7H4V7.41421L4.29289 7.70711L5 7ZM8 10H9V9.58579L8.70711 9.29289L8 10ZM8 11L8.70711 11.7071L9 11.4142V11H8ZM5 14L4.29289 13.2929L4 13.5858V14H5ZM5 17H4V18H5V17ZM14 17V18H15V17H14ZM14 14H15V13.5858L14.7071 13.2929L14 14ZM11 11H10V11.4142L10.2929 11.7071L11 11ZM15 3H16V2H15V3ZM15 4V5H16V4H15ZM4 4H3V5H4V4ZM15 18H16V17H15V18ZM15 19V20H16V19H15ZM4 19H3V20H4V19ZM7 15H8V14H7V15ZM7 16V17H8V16H7ZM6 16H5V17H6V16ZM9 15H10V14H9V15ZM9 16V17H10V16H9ZM8 16H7V17H8V16ZM8 14H9V13H8V14ZM8 15V16H9V15H8ZM7 15H6V16H7V15ZM10 14H11V13H10V14ZM10 15V16H11V15H10ZM9 15H8V16H9V15ZM12 14H13V13H12V14ZM12 15V16H13V15H12ZM11 15H10V16H11V15ZM11 13H12V12H11V13ZM11 14V15H12V14H11ZM10 14H9V15H10V14ZM9 13H10V12H9V13ZM9 14V15H10V14H9ZM8 14H7V15H8V14ZM10 12H11V11H10V12ZM10 13V14H11V13H10ZM9 13H8V14H9V13ZM10 10H11V9H10V10ZM10 11V12H11V11H10ZM9 11H8V12H9V11ZM11 8H12V7H11V8ZM11 9V10H12V9H11ZM10 9H9V10H10V9ZM10 7H11V6H10V7ZM10 8V9H11V8H10ZM9 8H8V9H9V8ZM8 7H9V6H8V7ZM8 8V9H9V8H8ZM7 8H6V9H7V8ZM12 7H13V6H12V7ZM12 8V9H13V8H12ZM11 8H10V9H11V8ZM9 8H10V7H9V8ZM9 9V10H10V9H9ZM8 9H7V10H8V9ZM11 15H12V14H11V15ZM11 16V17H12V16H11ZM10 16H9V17H10V16ZM13 15H14V14H13V15ZM13 16V17H14V16H13ZM12 16H11V17H12V16ZM11.7071 10.7071L14.7071 7.70711L13.2929 6.29289L10.2929 9.29289L11.7071 10.7071ZM15 7V5H13V7H15ZM14 4H5V6H14V4ZM4 5V7H6V5H4ZM4.29289 7.70711L7.29289 10.7071L8.70711 9.29289L5.70711 6.29289L4.29289 7.70711ZM7 10V11H9V10H7ZM7.29289 10.2929L4.29289 13.2929L5.70711 14.7071L8.70711 11.7071L7.29289 10.2929ZM4 14V17H6V14H4ZM5 18H14V16H5V18ZM15 17V14H13V17H15ZM14.7071 13.2929L11.7071 10.2929L10.2929 11.7071L13.2929 14.7071L14.7071 13.2929ZM12 11V10H10V11H12ZM4 4H15V2H4V4ZM14 3V4H16V3H14ZM15 3H4V5H15V3ZM5 4V3H3V4H5ZM4 19H15V17H4V19ZM14 18V19H16V18H14ZM15 18H4V20H15V18ZM5 19V18H3V19H5ZM6 16H7V14H6V16ZM6 15V16H8V15H6ZM7 15H6V17H7V15ZM7 16V15H5V16H7ZM8 16H9V14H8V16ZM8 15V16H10V15H8ZM9 15H8V17H9V15ZM9 16V15H7V16H9ZM7 15H8V13H7V15ZM7 14V15H9V14H7ZM8 14H7V16H8V14ZM8 15V14H6V15H8ZM9 15H10V13H9V15ZM9 14V15H11V14H9ZM10 14H9V16H10V14ZM10 15V14H8V15H10ZM11 15H12V13H11V15ZM11 14V15H13V14H11ZM12 14H11V16H12V14ZM12 15V14H10V15H12ZM10 14H11V12H10V14ZM10 13V14H12V13H10ZM11 13H10V15H11V13ZM11 14V13H9V14H11ZM8 14H9V12H8V14ZM8 13V14H10V13H8ZM9 13H8V15H9V13ZM9 14V13H7V14H9ZM9 13H10V11H9V13ZM9 12V13H11V12H9ZM10 12H9V14H10V12ZM10 13V12H8V13H10ZM9 11H10V9H9V11ZM9 10V11H11V10H9ZM10 10H9V12H10V10ZM10 11V10H8V11H10ZM10 9H11V7H10V9ZM10 8V9H12V8H10ZM11 8H10V10H11V8ZM11 9V8H9V9H11ZM9 8H10V6H9V8ZM9 7V8H11V7H9ZM10 7H9V9H10V7ZM10 8V7H8V8H10ZM7 8H8V6H7V8ZM7 7V8H9V7H7ZM8 7H7V9H8V7ZM8 8V7H6V8H8ZM11 8H12V6H11V8ZM11 7V8H13V7H11ZM12 7H11V9H12V7ZM12 8V7H10V8H12ZM8 9H9V7H8V9ZM8 8V9H10V8H8ZM9 8H8V10H9V8ZM9 9V8H7V9H9ZM10 16H11V14H10V16ZM10 15V16H12V15H10ZM11 15H10V17H11V15ZM11 16V15H9V16H11ZM12 16H13V14H12V16ZM12 15V16H14V15H12ZM13 15H12V17H13V15ZM13 16V15H11V16H13Z" fill="black" fillOpacity="0.8" mask="url(#path-1-outside-1_32_23)"/></g><defs><filter id="filter0_d_32_23" x="0" y="0" width="19" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1.5"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_32_23"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_32_23" result="shape"/></filter></defs></svg>

                  <p className="text-xl tracking-tight font-serif font-bold">houzel</p>
                </div>
                <span className="text-[12px] text-[#34322D] whitespace-pre-wrap max-md:text-start">Manus, derived from the Latin word for "hand", is a general AI agent that turns your thoughts into actions.</span>
                <div className="text-[color:var(--text-tertiary)] pb-5 max-md:pb-0 max-md:text-center max-w-[357px] text-[13px] max-md:leading-[140%] max-md:text-[10px] text-start font-normal leading-[22px] capitalize">© 2025 Manus AI</div>
                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/company/manus-im/" target="_blank" className="flex items-center justify-center cursor-pointer w-[28px] h-[28px]">
                    <svg width="28" height="28" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.24822 11.6358V22.0444H5.78202V11.6358H9.24822ZM9.46879 8.42133C9.47585 8.93267 9.299 9.35989 8.93825 9.703C8.57749 10.0461 8.10302 10.2177 7.51483 10.2177H7.49365C6.91958 10.2177 6.45745 10.0461 6.10729 9.703C5.75712 9.35989 5.58203 8.93267 5.58203 8.42133C5.58203 7.90333 5.76241 7.47435 6.12317 7.13437C6.48392 6.7944 6.95487 6.62461 7.536 6.625C8.11713 6.62539 8.58278 6.79518 8.93295 7.13437C9.28312 7.47356 9.46174 7.90255 9.46879 8.42133ZM21.7161 16.0784V22.0444H18.2605V16.4778C18.2605 15.7425 18.1187 15.1665 17.8352 14.7497C17.5517 14.3328 17.1088 14.1244 16.5065 14.1244C16.0654 14.1244 15.696 14.2452 15.3983 14.4868C15.1007 14.7283 14.8784 15.0277 14.7313 15.3849C14.6545 15.5951 14.616 15.8786 14.616 16.2354V22.0438H11.1604C11.1745 19.2499 11.1816 16.9846 11.1816 15.2479C11.1816 13.5111 11.1781 12.4748 11.171 12.1387L11.1604 11.6346H14.616V13.1469H14.5949C14.7349 12.923 14.8784 12.7269 15.0254 12.5587C15.1725 12.3904 15.3703 12.2083 15.6189 12.0122C15.8675 11.8162 16.1722 11.6638 16.533 11.5552C16.8937 11.4466 17.2947 11.3923 17.7358 11.3923C18.9334 11.3923 19.8962 11.7897 20.6244 12.5845C21.3526 13.3794 21.7167 14.5436 21.7167 16.0772L21.7161 16.0784Z" fill="#34322D"></path></svg>
                  </a>
                  <a href="https://x.com/ManusAI_HQ" target="_blank" className="flex items-center justify-center cursor-pointer w-[28px] h-[28px]">
                    <svg width="28" height="28" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#:R18mrqqdb:_clip0_2659_26042)"><path d="M19.5356 7.5H22.0727L16.531 13.8136L23.0742 22.375H17.9332L13.9271 17.1853L9.3202 22.375H6.78305L12.7253 15.6317L6.44922 7.5H11.7238L15.3626 12.26L19.5356 7.5ZM18.6342 20.8544H20.0363L10.956 8.92139H9.42035L18.6342 20.8544Z" fill="#34322D"></path></g><defs><clipPath id=":R18mrqqdb:_clip0_2659_26042"><rect width="16.625" height="14.875" fill="white" transform="translate(6.4502 7.5)"></rect></clipPath></defs></svg>
                  </a>
                  <a href="https://www.youtube.com/@Manus-AI/videos" target="_blank" className="flex items-center justify-center cursor-pointer w-[28px] h-[28px]">
                    <svg width="28" height="28" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#:R1omrqqdb:_clip0_2659_26048)"><path fillRule="evenodd" clipRule="evenodd" d="M21.8676 10.0233L21.8679 10.0243C22.025 10.6123 22.1235 11.6431 22.175 12.6399C22.1995 13.1147 22.2118 13.5452 22.218 13.857C22.2211 14.0126 22.2226 14.1378 22.2233 14.2231C22.2237 14.2658 22.2239 14.2985 22.224 14.32L22.2241 14.3437L22.2241 14.3489L22.2241 14.3498L22.2241 14.3557L22.224 14.3793C22.2239 14.4008 22.2237 14.4335 22.2233 14.4762C22.2226 14.5616 22.2211 14.6867 22.218 14.8423C22.2118 15.1541 22.1995 15.5846 22.175 16.0594C22.1235 17.0562 22.025 18.087 21.8679 18.6752L21.8676 18.6761C21.7868 18.9793 21.5462 19.2187 21.2487 19.2985C21.0307 19.357 20.5022 19.4277 19.7005 19.4864C18.9432 19.5418 18.059 19.5795 17.2078 19.6048C16.3592 19.6301 15.5558 19.6428 14.9638 19.6491C14.6681 19.6523 14.4259 19.6539 14.2581 19.6547C14.1742 19.6551 14.1089 19.6553 14.0649 19.6554H13.9334C13.8894 19.6553 13.8241 19.6551 13.7402 19.6547C13.5724 19.6539 13.3302 19.6523 13.0345 19.6491C12.4425 19.6428 11.6391 19.6301 10.7905 19.6048C9.93927 19.5795 9.05517 19.5418 8.29785 19.4864C7.49614 19.4277 6.96837 19.3573 6.75036 19.2987C6.4528 19.2189 6.21143 18.9792 6.13068 18.6761L6.13043 18.6752C5.97333 18.0871 5.87479 17.0562 5.82332 16.0595C5.7988 15.5846 5.78647 15.1541 5.78031 14.8423C5.77724 14.6867 5.77571 14.5616 5.77496 14.4762C5.77458 14.4335 5.7744 14.4008 5.7743 14.3793L5.77423 14.3557L5.77422 14.3504L5.77422 14.3495L5.77423 14.3437L5.7743 14.32C5.7744 14.2985 5.77458 14.2658 5.77496 14.2231C5.77571 14.1378 5.77724 14.0126 5.78031 13.857C5.78647 13.5452 5.7988 13.1147 5.82332 12.6399C5.87479 11.6431 5.97333 10.6123 6.13042 10.0243L6.13069 10.0233C6.21147 9.72009 6.45207 9.48071 6.74944 9.40099L6.75044 9.40072C6.96842 9.34213 7.49617 9.27165 8.29788 9.21299C9.05519 9.15757 9.93928 9.11988 10.7905 9.09451C11.6391 9.06922 12.4425 9.05654 13.0345 9.05019C13.3302 9.04702 13.5724 9.04543 13.7402 9.04464C13.8241 9.04425 13.8894 9.04405 13.9334 9.04395H14.0649C14.1089 9.04405 14.1742 9.04425 14.2581 9.04464C14.4259 9.04543 14.6681 9.04702 14.9638 9.05019C15.5558 9.05654 16.3592 9.06922 17.2078 9.09451C18.059 9.11988 18.9431 9.15757 19.7004 9.21299C20.5021 9.27165 21.0299 9.34213 21.2478 9.40072L21.2489 9.401C21.5462 9.4807 21.7868 9.72001 21.8676 10.0233ZM13.9992 7.46886C13.9992 7.46886 7.87011 7.46886 6.34161 7.87971C5.49833 8.10578 4.83416 8.77188 4.60878 9.61778C4.19922 11.1509 4.19922 14.3497 4.19922 14.3497C4.19922 14.3497 4.19922 17.5484 4.60878 19.0816C4.83416 19.9274 5.49833 20.5935 6.34161 20.8197C7.87011 21.2305 13.9992 21.2305 13.9992 21.2305C13.9992 21.2305 20.1282 21.2305 21.6567 20.8197C22.5 20.5935 23.1641 19.9274 23.3895 19.0816C23.7991 17.5484 23.7991 14.3497 23.7991 14.3497C23.7991 14.3497 23.7991 11.1509 23.3895 9.61778C23.1641 8.77188 22.5 8.10578 21.6567 7.87971C20.1282 7.46886 13.9992 7.46886 13.9992 7.46886Z" fill="#34322D"></path><path d="M11.9951 17.25L17.1178 14.3459L11.9951 11.4415V17.25Z" fill="#34322D"></path></g><defs><clipPath id=":R1omrqqdb:_clip0_2659_26048"><rect width="19.5999" height="13.7616" fill="white" transform="translate(4.2002 7.46875)"></rect></clipPath></defs></svg>
                  </a>
                  <a href="https://www.instagram.com/manusaiofficial" target="_blank" className="flex items-center justify-center cursor-pointer w-[28px] h-[28px]">
                    <svg width="28" height="28" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5042 5.75C12.1264 5.75 11.828 5.76039 10.8941 5.80286C9.96197 5.84551 9.32574 5.99297 8.76903 6.20933C8.19318 6.43278 7.7047 6.7317 7.21805 7.21818C6.73103 7.70448 6.43188 8.19259 6.20753 8.76784C5.99046 9.32431 5.84271 9.96024 5.80076 10.8913C5.75899 11.8245 5.74805 12.1229 5.74805 14.4989C5.74805 16.875 5.75863 17.1723 5.80094 18.1055C5.84381 19.0369 5.99138 19.6727 6.2077 20.2289C6.43152 20.8044 6.73066 21.2925 7.2175 21.7788C7.70398 22.2654 8.19245 22.5651 8.76794 22.7886C9.325 23.0049 9.96142 23.1524 10.8933 23.195C11.8272 23.2375 12.1255 23.2479 14.5031 23.2479C16.8811 23.2479 17.1786 23.2375 18.1125 23.195C19.0446 23.1524 19.6816 23.0049 20.2387 22.7885C20.8143 22.5651 21.3021 22.2654 21.7886 21.7788C22.2756 21.2925 22.5747 20.8044 22.7991 20.2291C23.0143 19.6727 23.1621 19.0367 23.2058 18.1057C23.2478 17.1725 23.2587 16.875 23.2587 14.4989C23.2587 12.1229 23.2478 11.8247 23.2058 10.8915C23.1621 9.96006 23.0143 9.32431 22.7991 8.76802C22.5747 8.19259 22.2756 7.70447 21.7886 7.21818C21.3015 6.73152 20.8145 6.4326 20.2381 6.20932C19.6799 5.99297 19.0434 5.84551 18.1113 5.80286C17.1774 5.76039 16.88 5.75 14.5015 5.75H14.5042ZM13.7188 7.32663C13.9519 7.32627 14.212 7.32663 14.5042 7.32663C16.8419 7.32663 17.119 7.33502 18.0421 7.37694C18.8958 7.41595 19.3591 7.55847 19.6677 7.67823C20.0763 7.8368 20.3676 8.02636 20.6739 8.33257C20.9803 8.63879 21.17 8.93042 21.3291 9.3387C21.4489 9.64673 21.5917 10.1097 21.6306 10.9627C21.6725 11.885 21.6817 12.1621 21.6817 14.4969C21.6817 16.8318 21.6725 17.1089 21.6306 18.0311C21.5915 18.8842 21.4489 19.3471 21.3291 19.6552C21.1704 20.0634 20.9803 20.3542 20.6739 20.6602C20.3674 20.9664 20.0765 21.156 19.6677 21.3145C19.3595 21.4348 18.8958 21.577 18.0421 21.616C17.1192 21.6579 16.8419 21.667 14.5042 21.667C12.1663 21.667 11.8893 21.6579 10.9663 21.616C10.1126 21.5766 9.64933 21.4341 9.34051 21.3144C8.93192 21.1558 8.64007 20.9662 8.33364 20.66C8.0272 20.3538 7.8375 20.0629 7.67844 19.6544C7.5586 19.3464 7.41577 18.8834 7.37693 18.0304C7.33497 17.1081 7.32658 16.8311 7.32658 14.4947C7.32658 12.1584 7.33497 11.8828 7.37693 10.9605C7.41596 10.1075 7.5586 9.64455 7.67844 9.33615C7.83713 8.92787 8.0272 8.63624 8.33364 8.33003C8.64007 8.02381 8.93192 7.83425 9.34051 7.67532C9.64914 7.55501 10.1126 7.41285 10.9663 7.37365C11.774 7.3372 12.087 7.32627 13.7188 7.32444L13.7188 7.32663ZM19.1778 8.77932C18.5977 8.77932 18.1271 9.24903 18.1271 9.82882C18.1271 10.4084 18.5977 10.8787 19.1778 10.8787C19.7578 10.8787 20.2284 10.4084 20.2284 9.82882C20.2284 9.24921 19.7578 8.77896 19.1778 8.77896L19.1778 8.77932ZM14.5042 10.006C12.0211 10.006 10.0079 12.0177 10.0079 14.4989C10.0079 16.9802 12.0211 18.991 14.5042 18.991C16.9873 18.991 18.9998 16.9802 18.9998 14.4989C18.9998 12.0177 16.9873 10.006 14.5042 10.006ZM14.5042 11.5826C16.1159 11.5826 17.4227 12.8882 17.4227 14.4989C17.4227 16.1095 16.1159 17.4152 14.5042 17.4152C12.8923 17.4152 11.5857 16.1095 11.5857 14.4989C11.5857 12.8882 12.8923 11.5826 14.5042 11.5826Z" fill="#34322D"></path></svg>
                  </a>
                  <a href="http://www.tiktok.com/@manusaiofficial" target="_blank" className="flex items-center justify-center cursor-pointer w-[28px] h-[28px]">
                    <svg width="28" height="28" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.1536 9.47148C18.2454 8.88039 17.5905 7.93424 17.3859 6.83187C17.3419 6.59374 17.3174 6.34844 17.3174 6.09766H14.4194L14.4148 17.6947C14.3661 18.9934 13.2956 20.0358 11.9836 20.0358C11.5756 20.0358 11.1917 19.9341 10.8534 19.7563C10.078 19.3489 9.54737 18.5374 9.54737 17.6035C9.54737 16.2622 10.6403 15.1708 11.9832 15.1708C12.2339 15.1708 12.4745 15.2122 12.702 15.2831V12.3289C12.4665 12.2969 12.2271 12.277 11.9832 12.277C9.04211 12.277 6.64941 14.6663 6.64941 17.6035C6.64941 19.4055 7.55085 21.0001 8.92668 21.9644C9.79302 22.572 10.8471 22.9296 11.9836 22.9296C14.9247 22.9296 17.3174 20.5404 17.3174 17.6035V11.7227C18.4539 12.5371 19.8466 13.0171 21.3493 13.0171V10.1234C20.54 10.1234 19.7862 9.88312 19.1536 9.47148Z" fill="#34322D"></path></svg>
                  </a>
                </div>
              </div>
              <div className="flex items-start sm:flex-col md:flex-row flex-col gap-10 max-md:px-[20px] max-md:w-full max-md:py-[20px]">
                <div className="flex w-[164.667px] flex-col items-start gap-3">
                  <div className="text-[#20262E] text-base font-semibold leading-5">Community</div>
                  <div className="flex gap-[4px] justify-center items-center">
                    <a href="/fellows" target="_blank" className="text-[#535350] text-sm font-medium leading-5 hover:underline duration-150">Fellows</a>
                  </div>
                  <div className="flex gap-[4px] justify-center items-center"><a href="/edu" target="_blank" className="text-[#535350] text-sm font-medium leading-5 hover:underline duration-150">Campus</a></div>
                  <div className="flex gap-[4px] justify-center items-center"><a href="/fellows" target="_blank" className="text-[#535350] text-sm font-medium leading-5 hover:underline duration-150">Fellows</a></div>
                </div>
                
                <div className="flex w-[164.667px] flex-col items-start gap-3">
                  <div className="text-[#20262E] text-base font-semibold leading-5">Company</div>
                  <div className="flex gap-[4px] justify-center items-center">
                    <a href="/feedback" target="_blank" className="text-[#535350] text-sm font-medium leading-5 hover:underline duration-150">Feedback</a>
                  </div>
                  <div className="flex gap-[4px] justify-center items-center">
                    <a href="mailto:media@manus.im " className="text-[#535350] text-sm font-medium leading-5 hover:underline duration-150">Media inquiries</a>
                  </div>
                  <div className="flex gap-[4px] justify-center items-center">
                    <a href="mailto:contact@manus.im" className="text-[#535350] text-sm font-medium leading-5 hover:underline duration-150">Contact us</a>
                  </div>
                </div>

                <div className="flex w-[164.667px] flex-col items-start gap-3">
                  <div className="text-[#20262E] text-base font-semibold leading-5">Resources</div>
                  <div className="flex gap-[4px] justify-center items-center">
                    <a href="/feedback" target="_blank" className="text-[#535350] text-sm font-medium leading-5 hover:underline duration-150">Privacy policy</a>
                  </div>
                  <div className="flex gap-[4px] justify-center items-center">
                    <a href="mailto:media@manus.im " className="text-[#535350] text-sm font-medium leading-5 hover:underline duration-150">Terms of service</a>
                  </div>
                </div>

              </div>
            </div>
            <div className="flex justify-center gap-[10px] items-center max-md:pt-[18px] max-md:mt-[18px] w-full pt-[36px] border-t-[rgba(0,0,0,0.06)] border-t border-solid">
              
            </div>
          </div>
        </div>
      </main>
    )
  } else {
    redirect('/home')
  }
}