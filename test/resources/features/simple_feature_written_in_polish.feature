# language: pl
Funkcja: Logowanie do aplikacji

  Scenariusz: Logowanie jako admin
    Mając otwartą stronę "/login.com"
    Kiedy wpiszesz "admin" jako nazwę
    I wpiszesz "***" jako hasło
    I klikniesz przycisk "Loguj"
    Wtedy zalogujesz się jako administrator