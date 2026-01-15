import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  submitButton: {
    marginTop: 12,
  },
});

const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
      rating
      text
    }
  }
`;

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: yup.string(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const reviewInput = {
      ownerName: values.ownerName,
      repositoryName: values.repositoryName,
      rating: Number(values.rating),
      text: values.text,
    };

    try {
      const { data } = await createReview({ variables: { review: reviewInput } });
      if (data && data.createReview) {
        const repositoryId = data.createReview.repositoryId;
        navigate(`/repositories/${repositoryId}`);
      }
    } catch (e) {
      // you may want to show error to user
      console.log(e);
      setErrors({ submit: e.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <Text>Create a review</Text>
            <FormikTextInput name="ownerName" placeholder="Repository owner username" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="text" placeholder="Review" multiline />
            <View style={styles.submitButton}>
              <Button title="Create review" onPress={handleSubmit} />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default CreateReview;

