echo "VITE_METADATA_URI=ipfs://$CID/metadata.json" > vite-ui/.env
echo "VITE_CONTRACT_ADDRESS=$ADDRESS" >> vite-ui/.env

cd vite-ui
npm install
npm run build
cd ..

git add .
git commit -m "Auto-deploy $(date +%Y-%m-%d_%H:%M:%S)"
git push