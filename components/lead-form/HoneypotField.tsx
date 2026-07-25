'use client';

import * as React from 'react';

/**
 * HoneypotField — invisible field to catch automated bots.
 *
 * Hidden via CSS (not `display:none` or `aria-hidden` which bots detect).
 * If this field is filled, the submission is silently discarded.
 */
export const HoneypotField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <div
    aria-hidden="true"
    tabIndex={-1}
    style={{
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      opacity: 0,
      pointerEvents: 'none',
    }}
  >
    <label htmlFor="website_url">Website</label>
    <input
      ref={ref}
      id="website_url"
      type="text"
      autoComplete="off"
      tabIndex={-1}
      {...props}
    />
  </div>
));
HoneypotField.displayName = 'HoneypotField';
