import React from 'react';

export const VerificationEmailPhone = () => {
  return (
    <>
      

<div className="w-full max-w-md bg-paper-0 border border-paper-200 rounded-lg shadow-sm p-space-6 md:p-space-8">

<div className="text-center mb-space-8">
<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-container text-on-primary-container mb-space-4">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>security</span>
</div>
<h1 className="font-display-md text-display-md text-primary mb-space-2">Check your email</h1>
<p className="font-body text-body text-on-surface-variant">
                    We've sent a 6-digit security code to <br />
<strong className="font-medium text-on-surface">tutor.flow@example.com</strong>
</p>
</div>

<form className="space-y-space-6" id="verification-form">
<div className="flex justify-between gap-space-2 sm:gap-space-3" id="otp-container">
<input aria-label="Digit 1" autofocus="" className="verification-input font-data-display text-data-display text-lg" maxlength="1" type="number" />
<input aria-label="Digit 2" className="verification-input font-data-display text-data-display text-lg" maxlength="1" type="number" />
<input aria-label="Digit 3" className="verification-input font-data-display text-data-display text-lg" maxlength="1" type="number" />
<input aria-label="Digit 4" className="verification-input font-data-display text-data-display text-lg" maxlength="1" type="number" />
<input aria-label="Digit 5" className="verification-input font-data-display text-data-display text-lg" maxlength="1" type="number" />
<input aria-label="Digit 6" className="verification-input font-data-display text-data-display text-lg" maxlength="1" type="number" />
</div>
<button className="w-full bg-primary hover:bg-primary/90 text-on-primary font-label text-label py-3 rounded transition-colors duration-200 flex justify-center items-center gap-2" type="submit">
                    Verify Identity
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</form>

<div className="mt-space-8 text-center space-y-space-4">
<p className="font-body text-body text-on-surface-variant">
                    Didn't receive the code? 
                    <span className="font-data-display text-data-display text-primary ml-1" id="cooldown-timer">00:30</span>
<button className="hidden text-primary hover:text-primary-container font-label text-label underline underline-offset-4 ml-1 transition-colors" id="resend-btn">Resend Code</button>
</p>
<div className="pt-space-4 border-t border-paper-200">
<a className="inline-flex items-center text-on-surface-variant hover:text-primary font-label text-label transition-colors" href="#">
<span className="material-symbols-outlined mr-1 text-sm">edit</span>
                        Change email address
                    </a>
</div>
</div>
</div>

    </>
  );
};
