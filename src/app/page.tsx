"use client";
import ChatList from "./_components/ChatList";
import ChatSrollAnchor from "./_components/ChatSrollAnchor";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEnterSubmit } from "@/lib/useEnterSubmit";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, PlusIcon } from "lucide-react";
import { ChatInputs } from "@/lib/chatSchema";
import { useActions, useUIState } from "ai/rsc";
import type { AI } from "./action";
import { UserMessage } from "./_components/Message";

export default function Home() {
  const { handleSubmit, register, watch } = useForm<ChatInputs>();
  const { formRef, onKeyDown } = useEnterSubmit();

  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessages } = useActions<typeof AI>();

  const onSubmit: SubmitHandler<ChatInputs> = async data => {
    const value = data.message.trim();
    formRef.current?.reset();
    if (!value) return;

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    try {
      const responseMessage = await sendMessages(value);
      setMessages(currentMessages => [...currentMessages, responseMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className='pb-50 pt-4 md:pt-10'>
        <ChatList messages={messages} />
        <ChatSrollAnchor />
      </div>
      <div className='fixed inset-x-0 bottom-4 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]'>
        <div className='mx-auto sm:max-w-2xl sm:px-4'>
          <div className='px-4 flex flex-col justify-center py-4 space-y-5 bordet-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4 bg-white'>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} action=''>
              <div className='relative flex flex-col items-center w-full overflow-hidden max-h-60 grow bg-background sm:rounded-sm sm:border'>
                <TextareaAutosize
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  placeholder='Send a message.'
                  className='min-h-[60px] w-full resize-none bg-transparent pl-4 pr-16 py-[1.3rem] focus-within:outline-none sm:text-sm'
                  autoFocus
                  spellCheck={false}
                  autoComplete='off'
                  autoCorrect='off'
                  rows={1}
                  {...register("message")}
                />
                <div className='absolute right-0 top-3 sm:right-4'>
                  <Button type='submit' size='icon' disabled={watch("message") === ""}>
                    <ArrowUpIcon className='w-5 h-5' />
                    <span className='sr-only'>Send messages</span>
                  </Button>
                </div>
              </div>
            </form>
            <Button variant='outline' size='lg' className='p-4'>
              <PlusIcon className='w-5 h-5' />
              <span>New Chat</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
