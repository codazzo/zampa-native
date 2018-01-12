import { StyleSheet } from 'react-native';
import {
  blue,
  white,
} from '../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clusterContainer: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: blue,
    justifyContent: 'center',
    backgroundColor: white,
  },
  counterText: {
    fontSize: 14,
    color: blue,
    fontWeight: 'bold',
  },
  calloutStyle: {
    width: 64,
    height: 64,
    padding: 8,
    borderRadius: 8,
    borderColor: blue,
    backgroundColor: white,
  },
});

export default styles;
