import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout2';
import Mintfile from '../components/MintfileEgypt';
import Footer from './Footer'

export default function PublishNews() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Add new file"
          description="add a new file"
        />
        <Mintfile />

      </Layout>
      <Footer />
    </ThemeProvider>
  );
}