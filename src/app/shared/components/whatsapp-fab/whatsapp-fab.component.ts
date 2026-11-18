import { Component, signal, PLATFORM_ID, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { SplashStateService } from '../../../core/services/splash-state.service';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- FLOATING WHATSAPP BUTTON (Fixed Bottom-Right Across Site) -->
    <button
      type="button"
      (click)="toggleWaChat($event)"
      class="btn-floating-whatsapp"
      [class.btn-floating-whatsapp--active]="isWaChatOpen()"
      aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      @if (showUnreadBadge() && !isWaChatOpen()) {
        <span class="wa-unread-badge" aria-label="1 new message">1</span>
      }
    </button>

    <!-- WHATSAPP CHAT POPUP WIDGET -->
    <div class="wa-chat-widget" *ngIf="isWaChatOpen()">
      <div class="wa-chat-header">
        <div class="wa-chat-avatar">
          <img src="/assets/images/farm-logo.svg" alt="Sanjivani Farm Logo">
        </div>
        <div class="wa-chat-info">
          <h4>Sanjivani Farm</h4>
          <p>Typically replies in minutes</p>
        </div>
        <button class="wa-chat-close" type="button" (click)="toggleWaChat($event)" aria-label="Close Chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="wa-chat-body">
        <!-- Typing indicator -->
        <div class="wa-chat-bubble wa-chat-bubble--typing" *ngIf="isWaTyping()">
          <div class="typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>

        <!-- Welcome message -->
        <div class="wa-chat-bubble" *ngIf="!isWaTyping() && hasShownWelcome()">
          Hi there! 👋<br>Welcome to Sanjivani Farm! 🌿<br><br>
          Here are our cottage experiences. Tap <strong>+</strong> to add one to your message, or ask us anything!

          <!-- Horizontal Cottage Cards -->
          <div class="wa-cottage-cards">
            <div class="wa-cottage-card">
              <div class="wa-cottage-img-wrapper">
                <img src="https://res.cloudinary.com/lrjfhrda/image/upload/v1786100108/IMG_9394_1_dorq1w.webp" alt="Family Cottage">
                <button class="wa-cottage-add" (click)="prefillWaMessage('I am interested in booking the Family Cottage.')" title="Select Cottage">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </button>
              </div>
              <div class="wa-cottage-name">Family</div>
              <a href="https://sanjivanifarmandresort.doorloom.com/p/dormitorycottage10" target="_blank" class="wa-cottage-link">View Details</a>
            </div>

            <div class="wa-cottage-card">
              <div class="wa-cottage-img-wrapper">
                <img src="https://res.cloudinary.com/lrjfhrda/image/upload/v1786100116/IMG-20260405-WA0021_ob9olz.webp" alt="Red Stone Cottage">
                <button class="wa-cottage-add" (click)="prefillWaMessage('I am interested in booking the Red Stone Cottage.')" title="Select Cottage">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </button>
              </div>
              <div class="wa-cottage-name">Red Stone</div>
              <a href="https://sanjivanifarmandresort.doorloom.com/p/redstomecottage07" target="_blank" class="wa-cottage-link">View Details</a>
            </div>

            <div class="wa-cottage-card">
              <div class="wa-cottage-img-wrapper">
                <img src="https://res.cloudinary.com/lrjfhrda/image/upload/v1786100120/IMG_9359_hzljsx.webp" alt="Wooden Glass Cottage">
                <button class="wa-cottage-add" (click)="prefillWaMessage('I am interested in booking the Wooden Glass Cottage.')" title="Select Cottage">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </button>
              </div>
              <div class="wa-cottage-name">Wooden Glass</div>
              <a href="https://sanjivanifarmandresort.doorloom.com/p/woodenglasscottage01" target="_blank" class="wa-cottage-link">View Details</a>
            </div>
          </div>

          <span class="wa-chat-time">Just now</span>
        </div>
      </div>

      <div class="wa-chat-footer">
        <input
          type="text"
          class="wa-chat-input"
          placeholder="Type a message..."
          [value]="waInputMessage()"
          (input)="waInputMessage.set($any($event.target).value)"
          (keyup.enter)="sendWaMessage(waInputMessage())">
        <button class="wa-chat-send" type="button" (click)="sendWaMessage(waInputMessage())" aria-label="Send Message">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    /* Fixed Green WhatsApp Icon */
    .btn-floating-whatsapp {
      position: fixed;
      bottom: clamp(1.25rem, 3vh, 2rem);
      right: clamp(1.25rem, 3vw, 2rem);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      background: #25D366;
      color: #ffffff;
      border: none;
      outline: none;
      border-radius: 50%;
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: visible;
    }

    .btn-floating-whatsapp:hover {
      transform: translateY(-4px) scale(1.06);
      box-shadow: 0 12px 30px rgba(37, 211, 102, 0.6);
      background: #20BD5A;
    }

    .btn-floating-whatsapp:active {
      transform: scale(0.96);
    }

    /* Unread 1 Badge (No white outline, solid red) */
    .wa-unread-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: #E53935;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 0.72rem;
      font-weight: 800;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      animation: badgePopIn 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      z-index: 100;
      pointer-events: none;
      line-height: 1;
    }

    @keyframes badgePopIn {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      70% {
        transform: scale(1.25);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Desktop Initial Position: Stacked below Tour button (13.5rem) and above scroll hint */
    @media (min-width: 1024px) {
      .btn-floating-whatsapp {
        bottom: 9.5rem;
        right: calc(var(--space-8, 2rem) - 16px);
        width: 48px;
        height: 48px;
      }

      .btn-floating-whatsapp svg {
        width: 26px;
        height: 26px;
      }

      .btn-floating-whatsapp--scrolled {
        box-shadow: 0 10px 25px -5px rgba(37, 211, 102, 0.6);
      }
    }

    /* WhatsApp Chat Popup Widget */
    .wa-chat-widget {
      position: fixed;
      bottom: calc(clamp(1.25rem, 3vh, 2rem) + 64px);
      right: clamp(1.25rem, 3vw, 2rem);
      z-index: 9999;
      width: 340px;
      max-width: calc(100vw - 2.5rem);
      background: #ffffff;
      border-radius: 18px;
      box-shadow: 0 20px 60px rgba(4, 18, 28, 0.28);
      overflow: hidden;
      animation: waPopupIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(16, 91, 133, 0.12);
    }

    @media (min-width: 1024px) {
      .wa-chat-widget {
        bottom: calc(9.5rem + 56px);
        right: calc(var(--space-8, 2rem) - 16px);
      }
    }

    @keyframes waPopupIn {
      from {
        opacity: 0;
        transform: translateY(12px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .wa-chat-header {
      background: #075E54;
      color: #ffffff;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .wa-chat-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ffffff;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .wa-chat-avatar img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .wa-chat-info {
      flex: 1;
    }

    .wa-chat-info h4 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 700;
      color: #ffffff;
    }

    .wa-chat-info p {
      margin: 2px 0 0;
      font-size: 0.725rem;
      color: rgba(255, 255, 255, 0.85);
    }

    .wa-chat-close {
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.8;
      transition: opacity 0.2s ease;
    }

    .wa-chat-close:hover {
      opacity: 1;
    }

    .wa-chat-close svg {
      width: 20px;
      height: 20px;
    }

    .wa-chat-body {
      background: #ECE5DD;
      padding: 16px;
      min-height: 200px;
      max-height: 380px;
      overflow-y: auto;
    }

    .wa-chat-bubble {
      background: #ffffff;
      padding: 12px 14px;
      border-radius: 12px;
      border-top-left-radius: 2px;
      font-size: 0.85rem;
      line-height: 1.5;
      color: #303030;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      position: relative;
      animation: messagePopIn 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      transform-origin: top left;
    }

    @keyframes messagePopIn {
      0% {
        opacity: 0;
        transform: translateY(12px) scale(0.92);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .wa-chat-bubble--typing {
      display: inline-block;
      padding: 10px 14px;
    }

    .typing-dots {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .typing-dots span {
      width: 6px;
      height: 6px;
      background-color: #888;
      border-radius: 50%;
      animation: typingBounce 1.4s infinite ease-in-out both;
    }

    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    .typing-dots span:nth-child(3) { animation-delay: 0s; }

    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    .wa-cottage-cards {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      margin-top: 10px;
      margin-bottom: 6px;
      padding-bottom: 4px;
      scrollbar-width: thin;
    }

    .wa-cottage-card {
      flex: 0 0 100px;
      background: #F8F9FA;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.08);
      text-align: center;
    }

    .wa-cottage-img-wrapper {
      position: relative;
      height: 60px;
    }

    .wa-cottage-img-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .wa-cottage-add {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 22px;
      height: 22px;
      background: #ffffff;
      border: none;
      border-radius: 50%;
      color: #128C7E;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .wa-cottage-name {
      font-size: 0.725rem;
      font-weight: 700;
      color: #333;
      padding: 4px 2px 2px;
    }

    .wa-cottage-link {
      display: block;
      font-size: 0.65rem;
      color: #007AFF;
      text-decoration: none;
      padding-bottom: 6px;
    }

    .wa-chat-time {
      display: block;
      font-size: 0.65rem;
      color: #888;
      text-align: right;
      margin-top: 4px;
    }

    .wa-chat-footer {
      background: #F0F2F5;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
    }

    .wa-chat-input {
      flex: 1;
      border: 1px solid #ccc;
      border-radius: 20px;
      padding: 8px 14px;
      font-size: 0.85rem;
      outline: none;
      background: #ffffff;
    }

    .wa-chat-input:focus {
      border-color: #128C7E;
    }

    .wa-chat-send {
      background: #25D366;
      border: none;
      color: #ffffff;
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .wa-chat-send:hover {
      background: #1DA851;
      transform: scale(1.05);
    }
  `]
})
export class WhatsappFabComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private splashState = inject(SplashStateService);
  private splashSub?: Subscription;

  readonly isWaChatOpen = signal<boolean>(false);
  readonly isWaTyping = signal<boolean>(false);
  readonly hasShownWelcome = signal<boolean>(false);
  readonly waInputMessage = signal<string>('');
  readonly showUnreadBadge = signal<boolean>(false);

  private badgeTimeoutId?: any;
  private incomingAudio?: HTMLAudioElement;
  private inChatAudio?: HTMLAudioElement;
  private hasPlayedArrivalSound = false;
  private hasTriggeredArrival = false;
  private interactionCleanup?: () => void;
  private earlyUnlockCleanup?: () => void;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initAudio();
      this.setupEarlyAudioUnlock();
      if (this.splashState.isSplashComplete) {
        // Splash already finished, start 2s timer
        this.startBadgeTimer();
      } else {
        // Wait for splash screen to complete so user actually sees the site, then wait 2s
        this.splashSub = this.splashState.splashComplete$.subscribe(isComplete => {
          if (isComplete) {
            this.startBadgeTimer();
          }
        });
      }
    }
  }

  private initAudio(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      this.incomingAudio = new Audio('/assets/sounds/message_coming_tone.mp3');
      this.incomingAudio.preload = 'auto';
      this.inChatAudio = new Audio('/assets/sounds/whatsapp_inchat.m4a');
      this.inChatAudio.preload = 'auto';
    } catch {}
  }

  /**
   * Captures early gestures (e.g. tapping splash screen or anywhere during page load)
   * to prime the browser's User Activation state for subsequent audio playback.
   */
  private setupEarlyAudioUnlock(): void {
    const onEarlyGesture = () => {
      try {
        if (this.incomingAudio && this.incomingAudio.paused) {
          this.incomingAudio.load();
        }
        if (this.inChatAudio && this.inChatAudio.paused) {
          this.inChatAudio.load();
        }
      } catch {}
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click', onEarlyGesture);
      window.removeEventListener('touchend', onEarlyGesture);
      window.removeEventListener('pointerup', onEarlyGesture);
    };

    this.earlyUnlockCleanup = cleanup;
    window.addEventListener('click', onEarlyGesture, { once: true, passive: true });
    window.addEventListener('touchend', onEarlyGesture, { once: true, passive: true });
    window.addEventListener('pointerup', onEarlyGesture, { once: true, passive: true });
  }

  private startBadgeTimer(): void {
    if (this.badgeTimeoutId || this.hasTriggeredArrival || this.showUnreadBadge()) return;
    this.badgeTimeoutId = setTimeout(() => {
      this.attemptSynchronizedArrival();
    }, 2000);
  }

  private attemptSynchronizedArrival(): void {
    if (this.hasTriggeredArrival || this.isWaChatOpen()) return;

    // Play tone and pop in badge together so sound and count are 100% matched
    this.playIncomingTone((success) => {
      if (success) {
        this.showUnreadBadge.set(true);
        this.hasTriggeredArrival = true;
        this.cdr.detectChanges();
        this.cleanupArrivalGesture();
      } else {
        // Autoplay restricted until user touches the screen.
        // Wait for first user tap so sound and count appear simultaneously, never out of sync!
        this.armSynchronizedArrivalOnFirstTap();
      }
    });
  }

  private armSynchronizedArrivalOnFirstTap(): void {
    if (this.hasTriggeredArrival) return;

    const onFirstUserTap = () => {
      if (this.hasTriggeredArrival || this.isWaChatOpen()) {
        this.cleanupArrivalGesture();
        return;
      }
      this.playIncomingTone(() => {
        this.showUnreadBadge.set(true);
        this.hasTriggeredArrival = true;
        this.cdr.detectChanges();
        this.cleanupArrivalGesture();
      });
    };

    this.cleanupArrivalGesture = () => {
      window.removeEventListener('click', onFirstUserTap);
      window.removeEventListener('touchend', onFirstUserTap);
      window.removeEventListener('pointerup', onFirstUserTap);
    };

    this.interactionCleanup = () => this.cleanupArrivalGesture();
    window.addEventListener('click', onFirstUserTap, { passive: true, once: true });
    window.addEventListener('touchend', onFirstUserTap, { passive: true, once: true });
    window.addEventListener('pointerup', onFirstUserTap, { passive: true, once: true });
  }

  private cleanupArrivalGesture(): void {
    if (this.interactionCleanup) {
      this.interactionCleanup();
      this.interactionCleanup = undefined;
    }
  }

  ngOnDestroy(): void {
    this.splashSub?.unsubscribe();
    if (this.badgeTimeoutId) {
      clearTimeout(this.badgeTimeoutId);
    }
    this.cleanupArrivalGesture();
    if (this.earlyUnlockCleanup) {
      this.earlyUnlockCleanup();
    }
    if (this.incomingAudio) {
      this.incomingAudio.pause();
    }
    if (this.inChatAudio) {
      this.inChatAudio.pause();
    }
  }

  /**
   * WhatsApp Incoming Notification Tone
   */
  private playIncomingTone(onResult?: (success: boolean) => void): void {
    if (!isPlatformBrowser(this.platformId)) {
      onResult?.(false);
      return;
    }
    try {
      if (!this.incomingAudio) {
        this.incomingAudio = new Audio('/assets/sounds/message_coming_tone.mp3');
      }
      this.incomingAudio.currentTime = 0;
      const playPromise = this.incomingAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.hasPlayedArrivalSound = true;
            onResult?.(true);
          })
          .catch(() => {
            // Autoplay blocked prior to user interaction
            onResult?.(false);
          });
      } else {
        this.hasPlayedArrivalSound = true;
        onResult?.(true);
      }
    } catch {
      onResult?.(false);
    }
  }

  /**
   * WhatsApp In-Chat Message Tone
   */
  private playInChatTone(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      if (!this.inChatAudio) {
        this.inChatAudio = new Audio('/assets/sounds/whatsapp_inchat.m4a');
      }
      this.inChatAudio.currentTime = 0;
      const playPromise = this.inChatAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch {}
  }

  toggleWaChat(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isWaChatOpen.update(v => !v);

    if (this.isWaChatOpen()) {
      // User opened chat: clear unread badge and mark arrived
      this.showUnreadBadge.set(false);
      this.hasTriggeredArrival = true;
      this.cleanupArrivalGesture();
      this.isWaTyping.set(true);
      this.hasShownWelcome.set(false);

      // Typing animation for 1 second, then auto message arrives with animation and sound
      setTimeout(() => {
        this.isWaTyping.set(false);
        this.hasShownWelcome.set(true);
        this.cdr.detectChanges();
        this.playInChatTone();
      }, 1000);
    } else {
      this.isWaTyping.set(false);
      this.waInputMessage.set('');
    }
  }

  prefillWaMessage(message: string): void {
    this.waInputMessage.set(message);
  }

  sendWaMessage(message: string): void {
    if (!message.trim()) return;
    const phone = '918108446040';
    const encoded = encodeURIComponent(message.trim());
    if (isPlatformBrowser(this.platformId)) {
      window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    }
    this.isWaChatOpen.set(false);
    this.waInputMessage.set('');
  }
}
