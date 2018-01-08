import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  controlBar: {
    top: 24,
    left: 25,
    right: 25,
    height: 40,
    borderRadius: 4,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  novaLabLogo: {
    right: 8,
    bottom: 8,
    width: 64,
    height: 64,
    position: 'absolute',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clusterContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  counterText: {
    fontSize: 14,
    color: '#65bc46',
    fontWeight: '400',
  },
  calloutStyle: {
    width: 64,
    height: 64,
    padding: 8,
    borderRadius: 8,
    borderColor: '#65bc46',
    backgroundColor: 'white',
  },
});

export default styles;
