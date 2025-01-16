import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './SearchForm.module.css'
import { FC } from 'react';

interface SearchFormProps {
  onSubmit: (query:string)=> void;
  initialQuery?:string
}

interface FormValues{
  query: string;
}

const SearchForm: FC<SearchFormProps> = ({ onSubmit, initialQuery = '' }) => {
  const validationSchema = Yup.object().shape({
    query: Yup.string().trim().required('The search field cannot be empty!'),
  });

  return (
    <Formik
      initialValues={{ query: initialQuery }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values.query);
        resetForm();
      }}
    >
      {() => (
        <Form className={css.formSearch}>
          <Field
            className={css.fieldInput}
            name="query"
            placeholder="Search for a movie..."
          />
          <ErrorMessage
            name="query"
            component="div"
            className={css.errorMessage}
          />
          <button type="submit" className={css.btnSearch}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;