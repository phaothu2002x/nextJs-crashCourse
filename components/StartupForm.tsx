'use client';

import { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState('');
    const { toast } = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch,
            };
            await formSchema.parseAsync(formValues);

            // console.log('check ', formValues);
            const result = await createPitch(prevState, formData, pitch);

            if (result.status == 'SUCCESS') {
                // console.log('run ', result._id);
                toast({
                    title: 'Success ',
                    description: 'Your startup has been created successfully',
                });
                router.push(`/startup/${result._id}`);
            }
            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldError = error.flatten().fieldErrors;
                setErrors(fieldError as unknown as Record<string, string>);
                toast({
                    title: 'Error',
                    description: 'Please check the input values',
                    variant: 'destructive',
                });

                return {
                    ...prevState,
                    error: 'validation failed',
                    status: 'ERROR',
                };
            }
        }
        toast({
            title: 'Error',
            description: 'UnExpected Error',
            variant: 'destructive',
        });
        return {
            ...prevState,
            error: 'UnExpected Error',
            status: 'ERROR',
        };
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: '',
        status: 'INITIAL',
    });

    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">
                    Title
                </label>
                <Input
                    id="title"
                    name="title"
                    placeholder="Startup Title"
                    className="startup-form_input"
                    required
                />
                {errors.title && (
                    <p className="startup-form_error"> {errors.title}</p>
                )}
            </div>
            <div>
                <label htmlFor="description" className="startup-form_label">
                    description
                </label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Startup description"
                    className="startup-form_textarea"
                    required
                />
                {errors.description && (
                    <p className="startup-form_error"> {errors.description}</p>
                )}
            </div>
            <div>
                <label htmlFor="category" className="startup-form_label">
                    Category
                </label>
                <Input
                    id="category"
                    name="category"
                    placeholder="Startup Category (Tech, health, education, lifestyle, etc.)"
                    className="startup-form_input"
                    required
                />
                {errors.category && (
                    <p className="startup-form_error"> {errors.category}</p>
                )}
            </div>
            <div>
                <label htmlFor="link" className="startup-form_label">
                    Image Url
                </label>
                <Input
                    id="link"
                    name="link"
                    placeholder="Startup Image Url"
                    className="startup-form_input"
                    required
                />
                {errors.link && (
                    <p className="startup-form_error"> {errors.link}</p>
                )}
            </div>
            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </label>
                <MDEditor
                    id="pitch "
                    height={300}
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    preview="edit"
                    style={{ borderRadius: 20, overflow: 'hidden' }}
                    textareaProps={{
                        placeholder:
                            'Briefly describe your startup and what the problems it solves.',
                    }}
                    previewOptions={{ disallowedElements: ['style'] }}
                />
                {errors.pitch && (
                    <p className="startup-form_error"> {errors.pitch}</p>
                )}
            </div>
            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? 'Submitting...' : 'Submit your Idea'}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    );
};

export default StartupForm;
