export default interface IFetchable<T>{
    data: T|null;
    error: string|null;
    isLoading: boolean;
}