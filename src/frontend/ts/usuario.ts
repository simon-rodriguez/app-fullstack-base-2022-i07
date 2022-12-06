class Usuario extends Persona implements Acciones{
    private username: string;
    private email: string;

    constructor(nombre:string, username:string, email:string) {
        super(nombre);
        this.username = username;
        this.email = email;
    }

    public getUsername() {
        super.getNombre(); // "super" definido en clase padre
        return this.username; // "this" definido en esta clase (incluye lo definido en el padre)
    }

    public toString(): string {
        return `${super.toString()} Username=${this.username}`; //"Template Strings"
        // return super.toString()+" Username="+this.username; concatenando
        // Usar this.XXX para referenciar a algo en la clase actual
        // Usar super.XXX para referenciar a algo en la clase padre
    }

    public recuperarConstraseña(): string {
        return "Puede recuperar";
    }

    public modificarUsuario(): string {
        return "No tiene los permisos";
    }

}

// Definir un string con "", o con '' permite usar variables
// ' Eso es un ${codigo} en un String'