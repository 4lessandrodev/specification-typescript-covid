import { User } from './user.entity';
import {
     UserHasAllCommonSymptomsSpecification as CommonSymptom,
     UserNeedMedical,
     UserNeedsUTI,
} from './user.specification';
import { UserHasLessCommonSymptomsSpecification as LessCommonSymptom } from './user.specification';
import { UserHasSomeSeriousSymptomsSpecification as SeriousSymptom } from './user.specification';

describe('user.specification', () => {
     it('user should has fever', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['FEBRE', 'CANSACO', 'TOSSE_SECA'],
          });

          const result = new CommonSymptom().isSatisfiedBy(Peter);
          expect(result).toBe(true);
     });

     it('user should has not fever', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['DOR_NO_PEITO'],
          });

          const result = new CommonSymptom().isSatisfiedBy(Peter);
          expect(result).toBe(false);
     });

     it('user should has some less common symptom', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['DIARREIRA'],
          });

          const result = new LessCommonSymptom().isSatisfiedBy(Peter);
          expect(result).toBe(true);
     });

     it('user should has not less common symptom', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['FEBRE'],
          });

          const result = new LessCommonSymptom().isSatisfiedBy(Peter);
          expect(result).toBe(false);
     });

     it('user should has some serious symptom', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['DIFICULDADE_DE_RESPIRAR'],
          });

          const result = new SeriousSymptom().isSatisfiedBy(Peter);
          expect(result).toBe(true);
     });

     it('user should has not serious symptom', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['DIARREIRA'],
          });

          const result = new SeriousSymptom().isSatisfiedBy(Peter);
          expect(result).toBe(false);
     });

     it('user should needs UTI', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: [
                    'FEBRE',
                    'TOSSE_SECA',
                    'CANSACO',
                    'DIFICULDADE_DE_RESPIRAR',
               ],
          });

          const result = new UserNeedsUTI().isSatisfiedBy(Peter);
          expect(result).toBe(true);
     });

     it('user should not needs UTI', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['FEBRE', 'TOSSE_SECA', 'CANSACO'],
          });

          const result = new UserNeedsUTI().isSatisfiedBy(Peter);
          expect(result).toBe(false);
     });

     it('user should not needs UTI', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['TOSSE_SECA', 'CANSACO', 'DIFICULDADE_DE_RESPIRAR'],
          });

          const result = new UserNeedsUTI().isSatisfiedBy(Peter);
          expect(result).toBe(false);
     });

     it('user should needs medical ', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['FEBRE', 'TOSSE_SECA', 'CANSACO'],
          });

          const result = new UserNeedMedical().isSatisfiedBy(Peter);
          expect(result).toBe(true);
     });

     it('user should needs medical ', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['FEBRE', 'TOSSE_SECA', 'CANSACO', 'PERDA_DE_FALA'],
          });

          const result = new UserNeedMedical().isSatisfiedBy(Peter);
          expect(result).toBe(true);
     });

     it('user should needs medical ', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: ['PERDA_DE_FALA'],
          });

          const result = new UserNeedMedical().isSatisfiedBy(Peter);
          expect(result).toBe(true);
     });

     it('user should not needs medical ', () => {
          const Peter = User.create({
               name: 'Peter',
               symptoms: [],
          });

          const result = new UserNeedMedical().isSatisfiedBy(Peter);
          expect(result).toBe(false);
     });
});
