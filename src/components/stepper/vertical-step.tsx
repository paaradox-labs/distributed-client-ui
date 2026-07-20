import { cn } from '@/lib/utils';
import * as React from 'react';
import { StepButtonContainer } from './step-button-container';
import { StepIcon } from './step-icon';
import { StepLabel } from './step-label';
import type { StepSharedProps } from './types';
import { useStepper } from './use-stepper';

const VerticalStep = React.forwardRef<HTMLDivElement, StepSharedProps>((props, ref) => {
    const {
        isError,
        isLoading,
        onClickStep,
        variant,
        checkIcon: checkIconContext,
        errorIcon: errorIconContext,
        styles,
    } = useStepper();

    const {
        index,
        isCompletedStep,
        isCurrentStep,
        hasVisited,
        icon,
        label,
        description,
        isKeepError,
        state,
        isLastStep,
        checkIcon: checkIconProp,
        errorIcon: errorIconProp,
    } = props;

    const localIsLoading = isLoading || state === 'loading';
    const localIsError = isError || state === 'error';

    const opacity = hasVisited ? 1 : 0.8;

    const checkIcon = checkIconProp || checkIconContext;
    const errorIcon = errorIconProp || errorIconContext;

    return (
        <div
            ref={ref}
            className={cn(
                'stepper__vertical-step',
                'flex gap-3 relative',
                styles?.['vertical-step']
            )}
            data-completed={isCompletedStep}
            data-active={isCurrentStep}
            data-invalid={localIsError}
        >
            <div className="flex flex-col items-center">
                <StepButtonContainer
                    {...{
                        index,
                        isCompletedStep,
                        isCurrentStep,
                        hasVisited,
                        isError: localIsError,
                        isLoading: localIsLoading,
                        isKeepError,
                        state,
                        onClickStep,
                    }}
                >
                    <StepIcon
                        {...{
                            index,
                            isCompletedStep,
                            isCurrentStep,
                            isError: localIsError,
                            isKeepError,
                            isLoading: localIsLoading,
                        }}
                        icon={icon}
                        checkIcon={checkIcon}
                        errorIcon={errorIcon}
                    />
                </StepButtonContainer>
                {!isLastStep && variant !== 'line' && (
                    <div
                        className={cn(
                            'w-[2px] flex-1 min-h-6 mt-1',
                            isCompletedStep ? 'bg-primary' : 'bg-border'
                        )}
                    />
                )}
            </div>
            <div className="pt-1 pb-6 flex-1">
                <StepLabel
                    label={label}
                    description={description}
                    {...{ isCurrentStep, opacity }}
                />
            </div>
        </div>
    );
});
VerticalStep.displayName = 'VerticalStep';
export { VerticalStep };
