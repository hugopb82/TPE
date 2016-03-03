// On associe une variable à chaque broche utilisée (leds + interrupteur)
int A = 13;
int B = 12;
int C = 11;
int D = 10;
int E = 2;

// Cette variable correspond au nombre que doit afficher le dé
int num = 1;

// On définit chaque broche comme étant une entrée ou une sortie 
// (sortie pour les leds, entrée pour l'interrupteur)
void setup() {
	pinMode(A, OUTPUT);
	pinMode(B, OUTPUT);
	pinMode(C, OUTPUT);
	pinMode(D, OUTPUT);
	pinMode(E, INPUT);
}

// Ce morceau de code est répété indéfiniment
void loop() {
	// A chaque face correspond une combinaison de leds bien définie
	if(num == 1){
		digitalWrite(D, HIGH);
	}
	if(num == 2){
		digitalWrite(A, HIGH);
	}
	if(num == 3){
		digitalWrite(D, HIGH);
		digitalWrite(A, HIGH);
	}
	if(num == 4){
		digitalWrite(A, HIGH);
		digitalWrite(C, HIGH);
	}
	if(num == 5){
		digitalWrite(A, HIGH);
		digitalWrite(C, HIGH);
		digitalWrite(D, HIGH);
	}
	if(num == 6){
		digitalWrite(A, HIGH);
		digitalWrite(B, HIGH);
		digitalWrite(C, HIGH);
		// Une fois que num vaut 6 on revient à 0
		num = 0;
	}

	// Si l'interrupteur est ouvert...
	if(digitalRead(E) == LOW){
		// ... on continue à changer de face
		num = num + 1;
		// ... tout en éteignant toutes les leds
		digitalWrite(A, LOW);
		digitalWrite(B, LOW);
		digitalWrite(C, LOW);
		digitalWrite(D, LOW);
	}

	// On laisse 50 millisecondes entre chaque boucle
	delay(50);
}
