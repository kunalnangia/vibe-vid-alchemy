
// Email Notification Edge Function
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    const { to, subject, content, videoId } = await req.json()
    
    if (!to || !subject || !content) {
      return new Response(
        JSON.stringify({ error: 'Email recipient, subject, and content are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    // For demo purposes, we'll log the email details
    // In production, you'd connect to an email service like SendGrid, Mailgun, etc.
    console.log(`Email sent to: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log(`Content: ${content.substring(0, 50)}...`)
    
    if (videoId) {
      console.log(`Related to video: ${videoId}`)
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Email notification sent' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error sending email notification:', error)
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
