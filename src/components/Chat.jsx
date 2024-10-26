import React from 'react'

const Chat = () => {
  return (
    <>

      <div className='text-black w-[100%] h-[50%] flex flex-col justify-end'>

        <div className=" justify-end flex w-[100%] h-5">
          <div className="w-[auto] h-8 p-2 rounded-lg bg-blue-300 flex justify-center items-center mr-5 mb-5"><h1>hello, how are you ?</h1></div>
        </div>
        <div className=" justify-start flex w-[100%] h-5">
          <div className="w-[auto] h-8 p-2 rounded-lg bg-gray-300 flex justify-center items-center ml-5"><h1>hello, as a language model i do not have feelings to feel emotions!</h1></div>
        </div>
        <div className=" justify-end flex w-[100%] h-5 mb-6">
          <div className="w-[auto] h-8 p-2 rounded-lg bg-blue-300 flex justify-center items-center mr-5 mt-5"><h1>Explain Block height and Genesis Block</h1></div>
        </div>
        <div className=" justify-start flex w-[100%] h-5">
          <div className="w-[auto] max-w-[55%] h-[150px] p-2 rounded-lg bg-gray-300 flex justify-center items-center ml-5"><p>I'd be happy to explain the terms "Block Height" and "Genesis Block" in detail.
            In the context of blockchain technology, block height refers to the sequential number assigned to a block within a blockchain. It represents the position of a block in the chronological order of transactions. The first block in the chain, known as the Genesis Block, is assigned a block height of 0, and each subsequent block is given a unique incrementing block height.</p></div>
        </div>
      </div>
      <input type='text' placeholder='Type a message..' className="fixed bottom-2 w-[98%] h-15 rounded-full px-5 bg-gray-200 "></input>

    </>
  )
}

export default Chat
