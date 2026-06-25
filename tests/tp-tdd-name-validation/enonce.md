# TP - TDD - 2

Création de classe de validation de mots et noms

Ces classes comporteront des méthodes prenant en paramètre une chaîne de caractères. Elles retourneront la chaîne de caractère si elle correspond aux critères de validation suivant, sinon une exception adaptée sera levée. 

1. Classe StringValidation
    1. validateLettersOnly(input: string): string, renvoie `input` si :
        - Ne contient que des lettres de l’alphabet, sinon exception `La chaîne de caractère ne doit contenir que des lettres de l'alphabet`
    2. validateLowercaseLettersOnly(input: string): string, renvoie `input` si :
        - Ne contient que des lettres minuscules de l’alphabet, sinon exception `La chaîne de caractère ne doit contenir que des lettres minuscules de l'alphabet`
    3. validateUppercaseLettersOnly(input: string): string, renvoie `input` si :
        - Ne contient que des lettres minuscules de l’alphabet, sinon exception `La chaîne de caractère ne doit contenir que des lettres majuscules de l'alphabet`
    4. validateCapitalized(input: string): string, renvoie `input` si :
        - Est constitué d’une première lettre en majuscule suivie de minuscules, sinon exception `Le nom doit être constitué d'une première lettre majuscule suivie de minuscules`
        - Refus de tout autre caractère que des lettres
2. Classe NameValidation
    1. validateName(input: string): string, renvoie `input` si :
        - Un nom peut être composé, ainsi malgré des `tirets` , le nom doit être constitué d’une première lettre en majuscule suivie de minuscules pour chacune de ses sous-parties, sinon exception `Le nom peut être composé mais chacune de ses parties doit être faite d'une première lettre majuscule suivie de minuscules`
        - Pour le moment cette validation refuse tout autre caractère que des lettres et tirets
        - Example : `Jean-Pierre` est valide, `jean-PierRe` ne l’est pas et doit lever une exception
    2. Permettre à validateName de valider des noms composés de 2 caractères minimum tel que validateName(input: string): string, renvoie `input` si :
        - Chacune des parties d’un nom composé doit être composé de 2 caractères et le nom doit respecter toutes les règles précédentes, sinon exception `Le nom peut être composé mais chacune de ses parties doit être faite d'une première lettre majuscule suivie de minuscules et doit être munie de 2 caractères minimum`
        - Example : `Jean-Pierre` est valide, `J-Pierre` ne l’est pas et doit lever une exception
        - Example : `Pierre` est valide mais `P` ne l’est pas et doit lever une exception
    3. Permettre à validateName de prendre en charge les `espaces` tel que validateName(input: string): string, renvoie `input` si :
        - Chacune des parties d’un nom composé doit être composé de 2 caractères et le nom doit respecter toutes les règles précédentes, sinon exception `Le nom ne doit contenir que des lettres, espaces ou tirets`
        - Example : `Jean-Pierre` est valide, `Jean;Pierre` ne l’est pas et doit lever une exception
        - Example : `Jean Pierre` est valide, `Jean;Pierre` ne l’est pas et doit lever une exception