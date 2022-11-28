class Usuario extends Persona{
    private username: string;
    private email: string;

    constructor(nombre:string, username:string,email:string) {
        super(nombre);
        this.username = username;
        this.email = email;
    }

    public getUsername() {
        super.getNombre(); // definido en clase padre
        return this.username; // definido en esta clase
    }

    public toString(): string {
        return super.toString()+"Username="+this.username;
        // Usar this.XXX para referenciar a algo en la clase actual
        // Usar super.XXX para referenciar a algo en la clase padre
    }

}

// Definir un string con "", o con '' permite usar variables
// ' Eso es un ${codigo} en un String'