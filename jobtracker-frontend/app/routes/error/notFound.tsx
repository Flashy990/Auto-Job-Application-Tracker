import NotFoundLogo from "/images/404-error.png";

export default function NotFound() {
    return <div className="mt-[35vh] text-secondary font-allerta-stencil text-4xl flex flex-col items-center">
        <img src={NotFoundLogo} alt="not-found" className="h-40" />
        404: Not Found
    </div>
}