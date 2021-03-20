import { Entity } from '../interfaces/entity.interface';

export enum typeSymptoms {
     'FEBRE',
     'TOSSE_SECA',
     'CANSACO',
     'DORES',
     'DOR_DE_GARGANTA',
     'DIARREIRA',
     'CONJUNTIVITE',
     'DOR_DE_CABECA',
     'PERDA_DO_PALADAR',
     'ERUPCAO_CULTANE',
     'DIFICULDADE_DE_RESPIRAR',
     'DOR_NO_PEITO',
     'PERDA_DE_FALA',
}

export type symptom = keyof typeof typeSymptoms;

export interface UserProps {
     name: string;
     symptoms?: symptom[];
}

export class User extends Entity<UserProps> {
     private constructor(props: UserProps) {
          super(props);
     }

     get name(): string {
          return this.props.name;
     }

     get symptoms(): symptom[] {
          return this.props.symptoms;
     }

     public static create(props: UserProps): User {
          return new User(props);
     }
}
