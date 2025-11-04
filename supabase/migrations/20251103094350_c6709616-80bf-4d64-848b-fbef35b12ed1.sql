-- Allow anyone to create courses and chat conversations without authentication
-- This enables the app to work without requiring login

-- Drop existing restrictive policies for courses
DROP POLICY IF EXISTS "Users can create own courses" ON public.courses;
DROP POLICY IF EXISTS "Users can update own courses" ON public.courses;
DROP POLICY IF EXISTS "Users can delete own courses" ON public.courses;

-- Create new permissive policies for courses
CREATE POLICY "Anyone can create courses"
ON public.courses
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update any course"
ON public.courses
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete any course"
ON public.courses
FOR DELETE
USING (true);

-- Drop existing restrictive policies for chat_conversations
DROP POLICY IF EXISTS "Users can create own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can view own conversations" ON public.chat_conversations;

-- Create new permissive policies for chat_conversations
CREATE POLICY "Anyone can create conversations"
ON public.chat_conversations
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view all conversations"
ON public.chat_conversations
FOR SELECT
USING (true);

-- Drop existing restrictive policies for messages
DROP POLICY IF EXISTS "Users can create messages in own conversations" ON public.messages;
DROP POLICY IF EXISTS "Users can view messages in own conversations" ON public.messages;

-- Create new permissive policies for messages
CREATE POLICY "Anyone can create messages"
ON public.messages
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view all messages"
ON public.messages
FOR SELECT
USING (true);