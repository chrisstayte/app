import fs from 'fs';
import path from 'path';

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next';

type Application = {
  name: string;
};

export const getStaticPaths = (async () => {
  // Path to the directory containing the JSON files
  const dataDirectory = path.join(process.cwd(), 'data');

  // Read the directory contents
  const filenames = fs.readdirSync(dataDirectory);

  // Generate the paths with slugs from the JSON file contents or fallback to filename
  const paths = filenames.map((filename) => {
    // Construct the full path for the JSON file
    const filePath = path.join(dataDirectory, filename);
    // Read the JSON file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    // Parse the JSON data
    const jsonData = JSON.parse(fileContents);

    // Use the slug from the JSON data or fallback to filename without the extension
    const slug = jsonData.slug || filename.replace(/\.json$/, '');

    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (params) => {
  // Get the slug from params
  const { slug } = params;

  // Find the JSON file that contains the slug in its content or matches the filename
  const dataDirectory = path.join(process.cwd(), 'data');
  const filenames = fs.readdirSync(dataDirectory);

  const filename = filenames.find((file) => {
    const filePath = path.join(dataDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);
    return jsonData.slug === slug || file.replace(/\.json$/, '') === slug;
  });

  // If a matching file is not found, return an empty object or handle as needed
  if (!filename) {
    return {
      notFound: true,
    };
  }

  // Construct the file path
  const filePath = path.join(dataDirectory, filename);

  // Read the file data
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Pass the data to the page via props
  return {
    props: {
      application: jsonData,
    },
  };
}) satisfies GetStaticProps<{ application: Application }>;

export default function Page({
  application,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return application.name;
}
