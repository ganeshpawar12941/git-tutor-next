"use client";
import { useEffect } from 'react';

export default function LoginBehaviors() {
  useEffect(() => {
    const container = document.getElementById('container');
    const onSignUp = () => container?.classList.add('right-panel-active');
    const onSignIn = () => container?.classList.remove('right-panel-active');

    // Support any buttons with these IDs (overlay and inline links)
    const signUpButtons = Array.from(document.querySelectorAll('#signUp'));
    const signInButtons = Array.from(document.querySelectorAll('#signIn'));
    signUpButtons.forEach(btn => btn.addEventListener('click', onSignUp));
    signInButtons.forEach(btn => btn.addEventListener('click', onSignIn));

    // Toggle password visibility
    const toggles = Array.from(document.querySelectorAll('.toggle-password'));
    const toggleHandler = (e) => {
      const targetId = e.currentTarget.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPwd = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPwd ? 'text' : 'password');
      const icon = e.currentTarget.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      }
    };
    toggles.forEach(t => t.addEventListener('click', toggleHandler));

    return () => {
      signUpButtons.forEach(btn => btn.removeEventListener('click', onSignUp));
      signInButtons.forEach(btn => btn.removeEventListener('click', onSignIn));
      toggles.forEach(t => t.removeEventListener('click', toggleHandler));
    };
  }, []);
  return null;
}
