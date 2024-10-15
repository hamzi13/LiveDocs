'use client'

import Loader from "@/components/Loader";
import { getClerkUsers, getdocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useUser()
  return (
    <LiveblocksProvider authEndpoint='/api/liveblocks-auth' resolveUsers={async ({ userIds }) => {
      const users = await getClerkUsers({ userIds })
      return users
    }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getdocumentUsers({ roomId, currentUser: clerkUser?.emailAddresses[0].emailAddress!, text })
        
        return roomUsers
      }}
    >

      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>

    </LiveblocksProvider>
  )
}

export default Provider
