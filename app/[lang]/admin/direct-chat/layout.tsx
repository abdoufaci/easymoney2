import DirectChatLeftSide from "./_components/direct-chat-left-side";

interface Props {
  children: React.ReactNode;
  params: {
    groupId?: string;
  };
}

function FollowUpLayout({ children, params }: Props) {
  return (
    <div className="followupBg w-[90%] h-full rounded-[15px] grid grid-cols-1 lg:!grid-cols-[35%_65%]">
      <DirectChatLeftSide />
      {children}
    </div>
  );
}

export default FollowUpLayout;
