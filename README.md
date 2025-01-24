# svidentity

**A dead simple Svelte-based identity provider with callback support that’s easy to integrate with.**

---

## Features

- **Simple Integration**: Built with simplicity in mind, making it easy to integrate with your existing projects.
- **Svelte-Powered**: Lightweight and fast frontend using Svelte.
- **Callback Support**: Seamlessly handle authentication callbacks for a smooth user experience.
- **Customizable**: Easily adapt the provider to fit your specific authentication requirements.

---

## Getting Started

### Prerequisites

Before setting up svidentity, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/owenrummage/svidentity.git
   cd svidentity
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   By default, the application will be available at `http://localhost:5173`.

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory to configure your environment. The following variables are supported:

- `DATABASE_URL`: Your database URL for data storage

### Customization

To customize svidentity, modify the Svelte components located in the `src/routes` directory. Key files include:

- `src/routes/login/+page.svelte`: The login page.
- `src/routes/reigster/+page.svelte`: Displays user information.

---

## Contributing

Contributions are welcome! If you’d like to contribute to svidentity, please follow these steps:

1. Fork the repository.

2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add your feature description"
   ```

4. Push to your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## Contact

For questions or support, please contact **Owen Rummage** via [GitHub Issues](https://github.com/owenrummage/svidentity/issues).

---

## Acknowledgments

Special thanks to the Svelte community for their tools and resources.
