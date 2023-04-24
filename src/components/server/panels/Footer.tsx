import footerLinks from "@/libs/footer-links";

const Footer = () => {
  return (
    <footer className="bg-gray-400">
      <div className="max-w-6xl mx-auto px-2 md:px-4 py-4 flex justify-between items-center">
        <h4>Plzang</h4>

        <ul className="flex gap-4">
          {footerLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                <link.Icon size={36} className="text-gray-600" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
