'use client'
import { createAccount } from '@shared/api'
import { routes } from '@shared/consts'
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    LabeledInput,
} from '@shared/ui'
import { cn } from '@shared/utils'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { object, string } from 'yup'

const Page: FC = () => {
    const { replace } = useRouter()
    const [error, setError] = useState<string | null>(null)
    const {
        isValid,
        isSubmitting,
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
        },
        validationSchema: object({
            email: string()
                .required('Required')
                .email('It does not look like email'),
            name: string()
                .required('Required')
                .min(1)
                .max(256, 'Name should not longer than 256 chars'),
            password: string()
                .required('Required')
                .min(8, 'Password should be at least 8 chars')
                .max(256, 'Password should not longer than 256 chars'),
        }),
        isInitialValid: false,
        onSubmit: async ({ name, email }, { setSubmitting }) => {
            setSubmitting(true)
            const nickname = name.replace(' ', '').toLowerCase()
            createAccount({ email, name, id: nickname })
                .then((res) => {
                    if (res.ok) {
                        Cookies.set('userId', nickname, {
                            expires: new Date(
                                Date.now() + 1000 * 60 * 60 * 24 * 7,
                            ),
                        })
                        replace(routes.auth.feed)
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
        <Card
            asChild
            className="w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription
                        className={cn(error && 'text-destructive')}
                    >
                        {error ? error : 'Create an account'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <LabeledInput
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            touched={touched.email}
                            error={errors.email}
                            label="Email"
                            placeholder="example@mail.com"
                        />
                        <LabeledInput
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            touched={touched.name}
                            error={errors.name}
                            label="Full name"
                            placeholder="John Smith"
                        />
                        <LabeledInput
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            touched={touched.password}
                            error={errors.password}
                            label="Password"
                            type="password"
                            placeholder="********"
                        />
                        <Button
                            disabled={isSubmitting || !isValid}
                            type="submit"
                        >
                            {isSubmitting && (
                                <LoaderCircle className="animate-spin mr-2" />
                            )}
                            Sign Up
                        </Button>
                        <Link
                            href={routes.unAuth.login}
                            className="m-auto hover:underline text-sm"
                        >
                            Already have an account?
                        </Link>
                    </div>
                </CardContent>
            </form>
        </Card>
    )
}

export default Page
