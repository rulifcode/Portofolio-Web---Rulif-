# Vercel Deploy Guide

Panduan ini untuk deploy project portfolio `rulifweb` ke Vercel.

## Tujuan

- Public portfolio bisa dibuka dari domain Vercel.
- Route React Router tetap jalan saat direct open atau refresh.
- Dashboard admin bisa dibuka dari `/admin`.
- Detail project bisa dibuka dari `/projects/:slug` atau alias `/project/:slug`.
- Firebase Auth dan Firestore tetap aktif di production melalui environment variables Vercel.

## Prasyarat

- Repository sudah ada di GitHub.
- Firebase project sudah dibuat.
- Firebase Authentication Email/Password sudah aktif.
- Firestore rules sudah dipasang.
- File `.env.local` lokal sudah terisi dan tidak ikut commit.

## File Vercel

Root project punya file:

```text
vercel.json
```

Isinya:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Rewrite ini wajib untuk SPA React Router. Tanpa ini, route seperti `/admin` atau `/projects/rulif-taskify-movie` bisa 404 saat dibuka langsung atau saat browser refresh.

## Import Project ke Vercel

1. Push project ke GitHub.
2. Buka Vercel.
3. Add New Project.
4. Import repository `rulifweb`.
5. Gunakan setting berikut:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node.js Version: 20.x
```

`package.json` sudah mendeklarasikan Node:

```json
"engines": {
  "node": "20.x"
}
```

## Environment Variables Vercel

Masuk ke:

```text
Vercel Project > Settings > Environment Variables
```

Tambahkan variable berikut untuk Production, Preview, dan Development jika ingin semua environment bisa memakai Firebase:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=rulifweb-portfolio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=rulifweb-portfolio
VITE_FIREBASE_STORAGE_BUCKET=rulifweb-portfolio.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=346787516773
VITE_FIREBASE_APP_ID=1:346787516773:web:dda04fdac601b50bbe918c

VITE_ADMIN_FACE_LOGIN_ENABLED=false
VITE_ADMIN_FACE_LABEL=Rulif Admin
VITE_ADMIN_FACE_DESCRIPTOR=
VITE_ADMIN_FACE_MATCH_THRESHOLD=0.5
VITE_FACE_API_MODEL_URL=/models
```

Catatan:

- Isi `VITE_FIREBASE_API_KEY` dari `.env.local` atau Firebase Console.
- Jangan commit `.env.local`.
- Biarkan `VITE_ADMIN_FACE_LOGIN_ENABLED=false` sampai login Firebase Auth production sudah aman.
- Isi `VITE_ADMIN_FACE_DESCRIPTOR` hanya setelah descriptor wajah dibuat dari halaman `/admin`.

## Firebase Authorized Domains

Agar login Firebase Auth bisa jalan di domain Vercel:

1. Buka Firebase Console.
2. Authentication.
3. Settings.
4. Authorized domains.
5. Tambahkan domain Vercel, contoh:

```text
rulifweb.vercel.app
```

Tambahkan juga custom domain jika nanti dipakai.

## Deploy

Setelah env variables disimpan:

1. Buka tab Deployments di Vercel.
2. Klik Redeploy pada deployment terbaru, atau push commit baru ke GitHub.
3. Tunggu build selesai.

Build lokal yang harus lolos sebelum deploy:

```bash
npm run build
```

## Route yang Harus Dites

Setelah deploy, cek:

```text
https://your-domain.vercel.app/
https://your-domain.vercel.app/admin
https://your-domain.vercel.app/projects
https://your-domain.vercel.app/project
https://your-domain.vercel.app/projects/rulif-taskify-movie
https://your-domain.vercel.app/project/rulif-taskify-movie
```

Expected:

- `/` menampilkan portfolio utama.
- `/admin` menampilkan login admin Firebase Auth.
- `/projects` dan `/project` menampilkan daftar project.
- `/projects/:slug` dan `/project/:slug` menampilkan detail project.
- Refresh browser di semua route tidak 404.

## Troubleshooting

Jika `/admin` atau `/projects/:slug` 404:

- Pastikan `vercel.json` ikut ter-commit.
- Pastikan deployment terbaru sudah memakai commit yang berisi `vercel.json`.

Jika login admin gagal:

- Pastikan env Firebase di Vercel lengkap.
- Pastikan domain Vercel sudah masuk Firebase Authorized domains.
- Pastikan user admin sudah dibuat di Firebase Authentication.
- Pastikan Firestore rules mengizinkan email admin yang benar.

Jika data Firestore tidak muncul:

- Cek browser console untuk error Firebase rules.
- Pastikan collection `projects`, `experiences`, `certificates`, atau document `siteContent/contact` sudah ada.
- Jika belum ada data, login `/admin` lalu seed atau tambah data manual.

Jika upload media besar terasa berat:

- Dashboard saat ini bisa menyimpan file sebagai data URL untuk file kecil.
- Untuk video, PDF besar, atau banyak gambar, gunakan Firebase Storage dan simpan download URL ke Firestore.
