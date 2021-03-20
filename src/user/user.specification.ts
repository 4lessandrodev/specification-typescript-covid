import { Specification } from '../specification/common/specification';
import { symptom, User } from './user.entity';

export class UserHasAllCommonSymptomsSpecification extends Specification<User> {
     private readonly SYMPTOM_CRITERIAL_FEVER: symptom = 'FEBRE';
     private readonly SYMPTOM_CRITERIAL_TOSSE_SECA: symptom = 'TOSSE_SECA';
     private readonly SYMPTOM_CRITERIAL_CANSACO: symptom = 'CANSACO';

     isSatisfiedBy(user: User): boolean {
          const symptoms = user.symptoms;
          return (
               symptoms.includes(this.SYMPTOM_CRITERIAL_FEVER) &&
               symptoms.includes(this.SYMPTOM_CRITERIAL_TOSSE_SECA) &&
               symptoms.includes(this.SYMPTOM_CRITERIAL_CANSACO)
          );
     }
}

export class UserHasLessCommonSymptomsSpecification extends Specification<User> {
     private readonly SYMPTOM_CRITERIAL: symptom[] = [
          'DORES',
          'DOR_DE_GARGANTA',
          'DIARREIRA',
          'CONJUNTIVITE',
          'DOR_DE_CABECA',
          'PERDA_DO_PALADAR',
          'ERUPCAO_CULTANE',
     ];

     isSatisfiedBy(user: User): boolean {
          const symptoms = user.symptoms;
          return symptoms
               .map((symptom) => this.SYMPTOM_CRITERIAL.includes(symptom))
               .includes(true);
     }
}

export class UserHasSomeSeriousSymptomsSpecification extends Specification<User> {
     private readonly SYMPTOM_CRITERIAL: symptom[] = [
          'DIFICULDADE_DE_RESPIRAR',
          'DOR_NO_PEITO',
          'PERDA_DE_FALA',
     ];

     isSatisfiedBy(user: User): boolean {
          const symptoms = user.symptoms;
          return symptoms
               .map((symptom) => this.SYMPTOM_CRITERIAL.includes(symptom))
               .includes(true);
     }
}

export class UserNeedsUTI extends Specification<User> {
     isSatisfiedBy(user: User): boolean {
          return new UserHasAllCommonSymptomsSpecification()
               .and(new UserHasSomeSeriousSymptomsSpecification())
               .isSatisfiedBy(user);
     }
}

export class UserNeedMedical extends Specification<User> {
     isSatisfiedBy(user: User): boolean {
          return new UserHasAllCommonSymptomsSpecification()
               .or(new UserHasSomeSeriousSymptomsSpecification())
               .or(new UserHasLessCommonSymptomsSpecification())
               .isSatisfiedBy(user);
     }
}
