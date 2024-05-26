import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a custom font (replace with actual font file if needed)
Font.register({
  family: 'Noorehuda',
  src: '@/../../../public/noorehuda.ttf' // ensure to replace this with the correct path
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 26,
    fontFamily: 'Noorehuda',
    direction: 'rtl',
  },
  ayah: {
    marginBottom: 10,
  },
});

const ArabicContentPdf = ({ selectedVersesArabic }) => {
  console.log('selectedVersesArabic:', selectedVersesArabic); // Debug log
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {selectedVersesArabic.map((verse, index) => (
          <View key={index} style={styles.section}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{verse.chapter}</Text>
            {verse.ayahs.map((ayah) => (
              <View key={ayah.number} style={styles.ayah}>
                <Text>{ayah.text} ({ayah.number})</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ArabicContentPdf;
