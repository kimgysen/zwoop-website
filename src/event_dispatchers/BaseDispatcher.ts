export interface BaseDispatcherProps<T> {
    addListener(callback: (evt: CustomEvent<T>) => void): void,
    dispatch(event: T): boolean;
    removeListener(callback: (evt: CustomEvent<T>) => void): void
}

export default class BaseDispatcher<T> implements BaseDispatcherProps<T> {
    protected readonly targetType;
    protected readonly targetTypeLoading?;

    constructor(targetType: string, targetTypeLoading: string|null) {
        this.targetType = targetType;
        this.targetTypeLoading = targetTypeLoading;
    }

    addListenerLoading(callback: (evt: CustomEvent<boolean>) => void): void {
        if (this.targetTypeLoading) {
            return document.addEventListener(this.targetTypeLoading, callback as (evt: Event) => void);
        }
    }

    addListener(callback: (evt: CustomEvent<T>) => void): void {
        return document.addEventListener(this.targetType, callback as (evt: Event) => void);
    }

    dispatchLoading(event: boolean): void {
        if (this.targetTypeLoading) {
            document.dispatchEvent(new CustomEvent(this.targetTypeLoading, { detail: event }));
        }
    }

    dispatch(event: T): boolean {
        return document.dispatchEvent(new CustomEvent(this.targetType, { detail: event }));
    }

    removeListenerLoading(callback: (evt: CustomEvent<boolean>) => void): void {
        if (this.targetTypeLoading) {
            document.removeEventListener(this.targetTypeLoading, callback as (evt: Event) => void);
        }
    }

    removeListener(callback: (evt: CustomEvent<T>) => void): void {
        document.removeEventListener(this.targetType, callback as (evt: Event) => void);
    }
}
