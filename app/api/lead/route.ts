import { NextResponse } from 'next/server';
import { leadPayloadSchema } from '@/types/lead-form';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate payload against strict Zod schema
    const validationResult = leadPayloadSchema.safeParse(body);

    if (!validationResult.success) {
      console.warn('[API/Lead] Invalid payload format', validationResult.error.flatten());
      return NextResponse.json(
        { error: 'Invalid submission data. Please check your inputs.' },
        { status: 400 }
      );
    }

    const cleanPayload = validationResult.data;

    // 2. Fetch Webhook URL securely from server environment
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('[API/Lead] N8N_WEBHOOK_URL is not configured on the server.');
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // 3. Forward to n8n securely
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15-second timeout

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(cleanPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error(`[API/Lead] Upstream webhook failed with status: ${response.status}`);
        return NextResponse.json(
          { error: 'Failed to submit enquiry. Please try again later.' },
          { status: 502 }
        );
      }

      // Read response to ensure completion, even if we don't return it directly
      await response.text().catch(() => {});

      // 4. Return clean JSON success
      return NextResponse.json(
        { success: true, message: 'Enquiry securely transmitted to workflow.' },
        { status: 200 }
      );
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      console.error('[API/Lead] Upstream webhook network error:', fetchError);
      
      const isTimeout = fetchError instanceof Error && fetchError.name === 'AbortError';
      return NextResponse.json(
        { 
          error: isTimeout 
            ? 'The submission timed out. Please check your connection and try again.' 
            : 'Network error communicating with our services.' 
        },
        { status: 504 }
      );
    }
  } catch (error) {
    console.error('[API/Lead] Unexpected server error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
