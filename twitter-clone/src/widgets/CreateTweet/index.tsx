'use client'
import { Tweet } from '@shared/types'
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    LabeledInput,
} from '@shared/ui'
import { useFormik } from 'formik'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { object, string } from 'yup'
import DOMPurify from 'dompurify'
import { createTweet, getTweets } from '@shared/api'
import Cookies from 'js-cookie'
import { LoaderCircle } from 'lucide-react'

interface Props {
    setTweetsPromise: Dispatch<SetStateAction<Promise<Tweet[]>>>
}

export const CreateTweet: FC<Props> = ({ setTweetsPromise }) => {
    const [error, setError] = useState<null | string>(null)
    const {
        isSubmitting,
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema: object({
            text: string()
                .required('Required')
                .test('is-sanitized', 'Dangerous layout', (value) => {
                    return (
                        DOMPurify.sanitize(value, {
                            ALLOWED_TAGS: [
                                'b',
                                'i',
                                'strong',
                                'em',
                                'u',
                                'br',
                                'ul',
                                'ol',
                                'li',
                                'p',
                                'h1',
                                'h2',
                                'h3',
                                'h4',
                                'h5',
                                'h6',
                            ],
                            ALLOWED_ATTR: ['style'],
                        }) === value
                    )
                }),
        }),
        onSubmit: ({ text }, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            createTweet({
                author_id: Cookies.get('userId') as string,
                id: Math.random()
                    .toString(36)
                    .substring(2, 2 + length),
                text,
            })
                .then((res) => {
                    if (res.ok) {
                        setTweetsPromise(getTweets())
                        resetForm()
                    } else {
                        setError('Something went wrong!')
                    }
                })
                .catch(() => {
                    setError('Something went wrong!')
                })
                .finally(() => {
                    setSubmitting(false)
                })
        },
    })

    return (
        <Card asChild>
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Add Tweet</CardTitle>
                    {error && <CardDescription>{error}</CardDescription>}
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <LabeledInput
                        label="Tweet"
                        placeholder="Something funny..."
                        name="text"
                        value={values.text}
                        touched={touched.text}
                        error={errors.text}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Button disabled={isSubmitting} className="w-fit ml-auto">
                        {' '}
                        {isSubmitting && (
                            <LoaderCircle className="animate-spin mr-2" />
                        )}
                        Tweet
                    </Button>
                </CardContent>
            </form>
        </Card>
    )
}
