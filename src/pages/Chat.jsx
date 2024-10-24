import React, { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [text, setText] = useState(null);

  const endRef = useRef(null);

  //   useEffect(() => {
  //     const scrollToEnd = () =>
  //       endRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, [chat]);

  const handelSend = async () => {
    if (!text.trim()) return;
    try {
      console.log(text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-[100%] bg-gray-700">
        <div className="h-[auto] overflow-y-auto">
            <div className="p-[20px] flex overflow-auto flex-col gap[20px">
                <div className="message max-w-[70%] flex gap-[20px]"></div>
            </div>
        </div>
    </div>
  )
};

export default Chat;
