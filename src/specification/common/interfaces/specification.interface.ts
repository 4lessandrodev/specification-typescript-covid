export interface ISpecification<T> {
     isSatisfiedBy: (target: T) => boolean;
     and: (other: ISpecification<T>) => ISpecification<T>;
     or: (other: ISpecification<T>) => ISpecification<T>;
}
